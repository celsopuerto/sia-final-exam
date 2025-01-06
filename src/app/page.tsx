"use client";

import { auth } from "@/firebase/config";
import { useAuth } from "@/hook/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  useAuth();
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.email || "Authenticated");
    } else {
      setUser("Unauthenticated");
    }
  });

  const handleLogout = async () => {
    if (user !== "Unauthenticated") {
      auth.signOut();
      toast.success("Sign Out Successfully");
    }
  };

  return (
    <div className="flex justify-center items-center mt-36">
      <div>{user} </div>
      <button type="button" onClick={handleLogout}>
        {" - CELSOGOD "}Logout
      </button>
    </div>
  );
}
