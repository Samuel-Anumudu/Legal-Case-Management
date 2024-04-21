"use client";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/firebase/config";

export const useAuthState = (collectionName: string) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthUser, setIsAuthUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDocRef = doc(db, collectionName, authUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          router.push("/");
        } else {
          setIsAuthUser(true);
          setUser(authUser);
        }
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  console.log("USER", user);

  return { user, isAuthUser };
};
