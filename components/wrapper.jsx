"use client"; // Only use in client-side components
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "./loadingScreen";

export default function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Show loading state while checking auth
    if (!session) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [session, status, router]);

  if (status === "loading") return <LoadingScreen />; // Simple loading indicator

  return <>{children}</>; // Render children if authorized
}
