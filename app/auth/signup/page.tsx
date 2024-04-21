"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import LawyerSignupForm from "@/app/components/forms/LawyerSignupForm";
import ClientSignupForm from "@/app/components/forms/ClientSignupForm";
import signupImage from "@/public/signup.svg";

function Signup() {
  const [isClientSignupButtonActive, setIsClientSignupButtonActive] =
    useState<boolean>(true);
  const [isLawyerSignupButtonActive, setIsLawyerSignupButtonActive] =
    useState<boolean>(false);

  const handleClientSignupButtonActive = () => {
    setIsClientSignupButtonActive(true);
    setIsLawyerSignupButtonActive(false);
  };

  const handleLawyerSignupButtonActive = () => {
    setIsClientSignupButtonActive(false);
    setIsLawyerSignupButtonActive(true);
  };

  const boxShadow = {
    boxShadow:
      "0px 2px 4px 0px rgba(17, 17, 17, 0.04), 0px 8px 32px 0px rgba(33, 33, 33, 0.08)",
  };
  return (
    <div>
      <div className="flex">
        <div className="flex h-screen w-full basis-2/4 items-center justify-center ">
          <Image src={signupImage} alt="Sign up" width={450} />
        </div>
        <div className="flex h-screen basis-2/4 items-center justify-center bg-[#fd5a1d]">
          <div
            style={boxShadow}
            className="h-[586.44px] w-[450px] rounded-2xl bg-white px-10 pt-10 font-extrabold"
          >
            <div className="text-center">
              <h2>Ligu</h2>
              <p>Sign Up</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleClientSignupButtonActive}
                className={`${isClientSignupButtonActive && "active-button"} relative`}
              >
                Sign up as client
              </button>
              <button
                onClick={handleLawyerSignupButtonActive}
                className={`${isLawyerSignupButtonActive && "active-button"} relative`}
              >
                Sign up as lawyer
              </button>
            </div>
            {isClientSignupButtonActive && <ClientSignupForm />}
            {isLawyerSignupButtonActive && <LawyerSignupForm />}
            <div>
              <small>
                Already have an account?
                <Link className="text-[#fd5a1d]" href="/auth/login">
                  Sign In
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
