"use client";

import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <main className="flex h-full w-full dark:bg-neutral-900">
      <Navigation />
      <div className="h-full flex-1 dark:bg-neutral-900 overflow-y-auto">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;