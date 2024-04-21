"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
function ClientDashboard() {
  const router = useRouter();
  const onLogout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <div>
      <h1>Welcome to Client Dashboard</h1>
      <button onClick={onLogout} type="button" className="btn">
        Logout
      </button>
    </div>
  );
}

export default ClientDashboard;
