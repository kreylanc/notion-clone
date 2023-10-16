"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Spinner from "@/components/Spinner";

const Navbar = () => {
  const scrolled = useScrollTop();

  // convex auth hook for checking user is logged in or out
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <header
      className={cn(
        "flex bg-background fixed w-full px-6 py-4 top-0 z-50 items-center gap-3 dark:bg-neutral-900 transition",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Link href="/" className="font-bold text-xl">
        Notion
      </Link>

      <nav className="w-full flex items-center justify-end md:ml-auto">
        <ul className="flex items-center gap-3">
          {isLoading && (
            <li>
              <Spinner />
            </li>
          )}
          {!isAuthenticated && !isLoading && (
            <>
              <li>
                <SignInButton mode="modal">
                  <Button variant="ghost">Log in</Button>
                </SignInButton>
              </li>
              <li>
                <SignInButton mode="modal">
                  <Button>Get Notion Free</Button>
                </SignInButton>
              </li>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <li>
                <Button variant="ghost">Enter Notion</Button>
              </li>
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            </>
          )}
        </ul>
      </nav>
      <ModeToggle />
    </header>
  );
};

export default Navbar;
