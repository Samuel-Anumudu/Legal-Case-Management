"use client";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

import validateFormData from "@/utils/validation/validateFormData";

interface FormValues {
  text: string;
  isError: boolean;
}

const initialFormData: Record<string, { text: string; isError: boolean }> = {
  firstName: { text: "", isError: false },
  lastName: { text: "", isError: false },
  email: { text: "", isError: false },
  password: { text: "", isError: false },
};

function ClientSignupForm() {
  const [clientSignupFormData, setClientSignupFormData] =
    useState<Record<string, FormValues>>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setClientSignupFormData({
      ...clientSignupFormData,
      [e.target.name]: {
        text: e.target.value,
        isError: false,
      },
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isFormValid, validatedFormData } =
      validateFormData(clientSignupFormData);

    if (!isFormValid) {
      setClientSignupFormData({
        ...validatedFormData,
        lastName: {
          text: "",
          isError: false,
        },
      });
      return;
    }

    setIsLoading(true);

    // Submit Form
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        clientSignupFormData.email.text,
        clientSignupFormData.password.text,
      );
      const user = userCredential.user;
      if (user) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
      // Save to db
      const clientData = {
        firstName: clientSignupFormData.firstName.text,
        lastName: clientSignupFormData.lastName.text,
        email: clientSignupFormData.email.text,
        cases: [],
        role: "client",
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, "clients", user.uid), clientData);
      router.push("/dashboard/client-dashboard");
    } catch (error: any) {
      setIsLoading(false);
      alert(
        "Please check if your email is not already in use and your password is up to 6 or more characters",
      );
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="text"
          name="firstName"
          value={clientSignupFormData.firstName.text}
          placeholder="First name"
          className={`${clientSignupFormData.firstName.isError && "input-error"} input input-bordered w-full max-w-full grow bg-white focus:outline-none`}
        />
        {clientSignupFormData.firstName.isError && (
          <span className="text-[#ff5761]">First Name is required</span>
        )}
      </div>
      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="text"
          name="lastName"
          value={clientSignupFormData.lastName.text}
          placeholder="Last name"
          className="input input-bordered w-full max-w-full  bg-white focus:outline-none"
        />
      </div>

      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="email"
          name="email"
          value={clientSignupFormData.email.text}
          placeholder="Email"
          className={`${clientSignupFormData.email.isError && "input-error"} input input-bordered w-full max-w-full  bg-white focus:outline-none`}
        />
        {clientSignupFormData.email.isError && (
          <span className="text-[#ff5761]">Email is required</span>
        )}
      </div>
      <div className="form-control">
        <label
          className={`${clientSignupFormData.password.isError && "input-error"} input input-bordered flex items-center gap-2 bg-white focus-within:outline-none`}
        >
          <input
            onChange={onChangeHandler}
            type={showPassword ? "text" : "password"}
            name="password"
            value={clientSignupFormData.password.text}
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
        {clientSignupFormData.password.isError && (
          <span className="text-[#ff5761]">Password is required</span>
        )}
      </div>
      {!isLoading ? (
        <button
          type="submit"
          className="btn w-full rounded-full bg-[#262626] text-white hover:bg-[#262626]"
        >
          Sign Up
        </button>
      ) : (
        <button className="btn w-full rounded-full bg-[#262626] text-white hover:bg-[#262626]">
          <span className="loading loading-spinner"></span>
        </button>
      )}
    </form>
  );
}

export default ClientSignupForm;
