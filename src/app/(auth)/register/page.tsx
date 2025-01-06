"use client";

import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hook/useAuth";

export default function RegisterPage() {
  useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        toast.success("Account Created");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while registering");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
        <div>
          <input
            className="text-gray-950"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="text-gray-950"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center ">
          <button type="submit">{loading ? "Loading..." : "Register"}</button>
        </div>
        <p>
          Already have an account? <a href="/login"> Login</a>
        </p>
      </form>
    </div>
  );
}
