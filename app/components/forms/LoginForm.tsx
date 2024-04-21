"use client";

import { use, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validateFormData from "@/utils/validation/validateFormData";
import { useRouter } from "next/navigation";

import { auth, db } from "@/app/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

interface FormValues {
  text: string;
  isError: boolean;
}

const initialFormData: Record<string, { text: string; isError: boolean }> = {
  email: { text: "", isError: false },
  password: { text: "", isError: false },
};

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] =
    useState<Record<string, FormValues>>(initialFormData);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setLoginData({
      ...loginData,
      [e.target.name]: {
        text: e.target.value,
        isError: false,
      },
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isFormValid, validatedFormData } = validateFormData(loginData);

    if (!isFormValid) {
      setLoginData(validatedFormData);
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email.text,
        loginData.password.text,
      );

      const user = userCredential.user;
      if (user) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }

      // Redirect Role
      const userDocRef = doc(db, "clients", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists() && userDocSnap.data().role === "client") {
        router.push("/dashboard/client-dashboard");
      } else {
        router.push("/dashboard/lawyer-dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      alert("You have entered wrong credentials. Try again!");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="email"
          name="email"
          value={loginData.email.text}
          placeholder="Email"
          className={`${loginData.email.isError && "input-error"} input input-bordered w-full max-w-full  bg-white focus:outline-none`}
        />
        {loginData.email.isError && (
          <span className="text-[#ff5761]">Email is required</span>
        )}
      </div>
      <div className="form-control">
        <label
          className={`${loginData.password.isError && "input-error"} input input-bordered flex items-center gap-2 bg-white focus-within:outline-none`}
        >
          <input
            onChange={onChangeHandler}
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData.password.text}
            className="grow"
            placeholder="Password"
          />
          <span
            className="badge badge-info cursor-pointer bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </label>
        {loginData.password.isError && (
          <span className="text-[#ff5761]">Password is required</span>
        )}
      </div>
      {!isLoading ? (
        <button
          type="submit"
          className="btn w-full rounded-full bg-[#262626] text-white hover:bg-[#262626]"
        >
          Sign In
        </button>
      ) : (
        <button className="btn w-full rounded-full bg-[#262626] text-white hover:bg-[#262626]">
          <span className="loading loading-spinner"></span>
        </button>
      )}
    </form>
  );
}

export default LoginForm;
