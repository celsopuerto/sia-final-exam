import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      } else {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          router.push("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);
}
