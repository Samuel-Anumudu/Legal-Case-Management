"use client";

import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import "../../styles/globals.css";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    const checkAuthState = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userDocRef = doc(db, "clients", user.uid);
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
    <html lang="en">
      <body>
        <section className="container mx-auto max-w-[1110px]">
          {children}
        </section>
      </body>
    </html>
  );
}
