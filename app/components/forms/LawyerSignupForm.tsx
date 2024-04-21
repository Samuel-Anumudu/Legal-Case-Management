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
  specialty: { text: "", isError: false },
  billingRate: { text: "", isError: false },
};

function LawyerSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [lawyerSignupFormData, setLawyerSignupFormData] =
    useState<Record<string, FormValues>>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const SPECIALTY_OPTIONS = [
    "Employment",
    "Criminal",
    "Civil",
    "Personal Injury",
    "Immigration",
  ];

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isFormValid, validatedFormData } =
      validateFormData(lawyerSignupFormData);

    if (!isFormValid) {
      setLawyerSignupFormData({
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
        lawyerSignupFormData.email.text,
        lawyerSignupFormData.password.text,
      );
      const user = userCredential.user;

      if (user) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
      // Save to db
      const lawyerData = {
        firstName: lawyerSignupFormData.firstName.text,
        lastName: lawyerSignupFormData.lastName.text,
        email: lawyerSignupFormData.email.text,
        specialty: lawyerSignupFormData.specialty.text,
        billingRate: lawyerSignupFormData.billingRate.text,
        cases: [],
        role: "lawyer",
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, "lawyers", user.uid), lawyerData);
      router.push("/dashboard/lawyer-dashboard");
    } catch (error: any) {
      setIsLoading(false);
      alert(
        "Please check if your email is not already in use and your password is up to 6 or more characters",
      );
      console.log(error);
    }
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setLawyerSignupFormData({
      ...lawyerSignupFormData,
      [e.target.name]: {
        text: e.target.value,
        isError: false,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="text"
          name="firstName"
          value={lawyerSignupFormData.firstName.text}
          placeholder="First name"
          className={`${lawyerSignupFormData.firstName.isError && "input-error"} input input-bordered w-full max-w-full grow bg-white focus:outline-none`}
        />
        {lawyerSignupFormData.firstName.isError && (
          <span className="text-[#ff5761]">First Name is required</span>
        )}
      </div>
      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="text"
          name="lastName"
          value={lawyerSignupFormData.lastName.text}
          placeholder="Last name"
          className="input input-bordered w-full max-w-full  bg-white focus:outline-none"
        />
      </div>

      <div className="form-control">
        <input
          onChange={onChangeHandler}
          type="email"
          name="email"
          value={lawyerSignupFormData.email.text}
          placeholder="Email"
          className={`${lawyerSignupFormData.email.isError && "input-error"} input input-bordered w-full max-w-full  bg-white focus:outline-none`}
        />
        {lawyerSignupFormData.email.isError && (
          <span className="text-[#ff5761]">Email is required</span>
        )}
      </div>
      <div className="form-control">
        <label
          className={`${lawyerSignupFormData.password.isError && "input-error"} input input-bordered flex items-center gap-2 bg-white focus-within:outline-none`}
        >
          <input
            onChange={onChangeHandler}
            type={showPassword ? "text" : "password"}
            name="password"
            value={lawyerSignupFormData.password.text}
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
        {lawyerSignupFormData.password.isError && (
          <span className="text-[#ff5761]">Password is required</span>
        )}
      </div>

      <div className="form-control">
        <input
          onChange={onChangeHandler}
          min="0"
          type="number"
          name="billingRate"
          value={lawyerSignupFormData.billingRate.text}
          placeholder="Billing rate"
          className={`${lawyerSignupFormData.billingRate.isError && "input-error"} input input-bordered w-full max-w-full  bg-white focus:outline-none`}
        />
        {lawyerSignupFormData.billingRate.isError && (
          <span className="text-[#ff5761]"> Billing rate is required</span>
        )}
      </div>

      <div className="form-control">
        <select
          onChange={onChangeHandler}
          className={`${lawyerSignupFormData.billingRate.isError && "select-error"} select select-bordered w-full max-w-full  bg-white focus:outline-none`}
          name="specialty"
          value={lawyerSignupFormData.specialty.text}
        >
          <option disabled value="">
            Specialty
          </option>
          {SPECIALTY_OPTIONS.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        {lawyerSignupFormData.specialty.isError && (
          <span className="text-[#ff5761]">Specialty is required</span>
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

export default LawyerSignupForm;
