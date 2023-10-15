"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <nav
      className={cn(
        "flex bg-background fixed w-full px-6 py-4 top-0 z-50 items-center dark:bg-neutral-900",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Link href="/" className="font-bold">
        Notion
      </Link>
      <ul className="w-full flex justify-end gap-3 md:ml-auto">
        <li>
          <ModeToggle />
        </li>
        <li>
          <Button>Login</Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
