"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    const checkAuthState = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setIsAuthUser(true);
      }
    });

    return () => checkAuthState();
  }, []);

  const onLogout = () => {
    auth.signOut();
    router.push("/auth/login");
  };

  return (
    <nav>
      <div className="navbar bg-base-100 p-0">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold">
            L<span className="text-[#fd5a1d]">i</span>gu
          </h1>
        </div>

        <div className="flex-none gap-2">
          {!isAuthUser && (
            <div>
              <ul>
                <li>
                  <Link href="/auth/login">Log in</Link>
                </li>
              </ul>
            </div>
          )}
          {isAuthUser && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={onLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
