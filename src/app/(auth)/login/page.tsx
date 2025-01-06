"use client";

import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";
import toast from "react-hot-toast";

export default function LoginPage() {
  useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        toast.success("Login Successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
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
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
        </div>
        <div>
          <p>
            Don{"'"}t have an account? <a href="/register"> Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
