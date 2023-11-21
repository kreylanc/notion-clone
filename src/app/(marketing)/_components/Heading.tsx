"use client";

import Spinner from "@/components/Spinner";
import { Button, buttonVariants } from "@/components/ui/button";
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
        <Link href="/documents" className={buttonVariants()}>
          Enter Notion
          <ArrowRight
            aria-label="arrow right"
            size={18}
            className="ml-1.5 text-secondary"
          />
        </Link>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion Free
            <ArrowRight
              aria-label="arrow right"
              size={18}
              className="ml-1.5 text-secondary"
            />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading;
