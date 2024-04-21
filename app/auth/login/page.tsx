"use client";

import Image from "next/image";
import loginImage from "@/public/login.svg";
import LoginForm from "@/app/components/forms/LoginForm";
import Link from "next/link";

function Login() {
  const boxShadow = {
    boxShadow:
      "0px 2px 4px 0px rgba(17, 17, 17, 0.04), 0px 8px 32px 0px rgba(33, 33, 33, 0.08)",
  };
  return (
    <div>
      <div className="flex">
        <div className="flex h-screen w-full basis-2/4 items-center justify-center bg-white">
          <Image src={loginImage} alt="Sign up" width={450} />
        </div>
        <div className="flex h-screen basis-2/4 items-center justify-center bg-[#fc591d]">
          <div
            style={boxShadow}
            className="h-[586.44px] w-[450px] rounded-2xl bg-white px-10 pt-10 font-extrabold"
          >
            <div className="text-center">
              <h2>Ligu</h2>
              <p>Sign In</p>
            </div>
            <LoginForm />
            <div className="flex justify-between">
              <small>
                Don't have an account
                <Link className="text-[#fc591d]" href="/auth/signup">
                  Sign Up
                </Link>
              </small>
              <small>
                <Link href="">Forgot Password?</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
