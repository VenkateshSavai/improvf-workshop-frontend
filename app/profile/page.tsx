"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import Loading from "@/components/loading";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user, logout, getProfileData } = useAuth();

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
        <h1 className="text-3xl font-bold text-center">Profile</h1>

        {!showResetForm ? (
          <>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user?.name ?? "N/A"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email ?? "N/A"}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setShowResetForm(true)}
                className="w-full py-2 text-center text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Reset Password
              </button>
              <Link
                href="/"
                className="w-full py-2 text-center text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={logout}
                className="w-full py-2 text-center text-destructive bg-white border border-destructive rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <ResetPasswordForm onCancel={() => setShowResetForm(false)} />
        )}
      </div>
    </main>
  );
}
