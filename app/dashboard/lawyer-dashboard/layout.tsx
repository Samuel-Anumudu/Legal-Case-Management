"use client";

import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { StoreProvider } from "@/app/StoreProvider";
import LawyerDashboardNav from "@/app/components/dashboard/components/LawyerDashboardNav";
import "../../styles/globals.css";

export default function LawyerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthUser, setIsAuthUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDocRef = doc(db, "lawyers", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) router.push("/");
          setIsAuthUser(true);
        } else {
          router.push("/");
        }
      });
    };
    return () => checkAuthState();
  }, []);

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <header>
            <section className="container mx-auto max-w-[1110px]">
              <LawyerDashboardNav />
            </section>
          </header>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
