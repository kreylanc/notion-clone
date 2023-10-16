"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Heading() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold">
        Your wiki, docs, & projects. Together.
      </h1>
      <p className="md:text-xl">
        Notion is the connected workspace where better, faster work happens.
      </p>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button size="lg" asChild>
          <Link href="/documents">Enter Notion</Link>
          <ArrowRight
            aria-label="arrow right"
            size={18}
            className="ml-1.5 text-white"
          />
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size="lg">
            Get Notion Free
            <ArrowRight
              aria-label="arrow right"
              size={18}
              className="ml-1.5 text-white"
            />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading;
