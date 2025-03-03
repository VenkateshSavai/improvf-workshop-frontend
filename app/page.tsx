"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Loading from "@/components/loading";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, logout, getProfileData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    } else {
      getProfileData();
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) return <Loading />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Welcome to Dashboard</h1>
        {user?.name && (
          <p className="text-center text-gray-600">
            You are logged in as{" "}
            <span className="font-semibold">{user?.name}</span>
          </p>
        )}
        <div className="flex flex-col space-y-4">
          <Link
            href="/profile"
            className="w-full py-2 text-center text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to Profile
          </Link>
          <button
            onClick={logout}
            className="w-full py-2 text-center text-primary bg-white border border-primary rounded-md hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
