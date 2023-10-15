"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function Heading() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold">
        Your wiki, docs, & projects. Together.
      </h1>
      <p className="md:text-xl">
        Notion is the connected workspace where better, faster work happens.
      </p>
      <Button size="lg">
        Join Notion
        <ArrowRight
          aria-label="arrow right"
          size={18}
          className="ml-1.5 text-white"
        />
      </Button>
    </div>
  );
}

export default Heading;
