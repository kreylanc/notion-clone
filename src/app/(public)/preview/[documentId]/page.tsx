"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  params: {
    documentId: Id<"documents">;
  };
};

const Page = ({ params: { documentId } }: Props) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  const note = useQuery(api.documents.getDocById, { id: documentId });

  const update = useMutation(api.documents.update);

  if (note === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[50%]" />
          </div>
        </div>
      </div>
    );
  }

  if (note === null) {
    return <div className="pb-[30vh] mt-12">Not found</div>;
  }

  if (!note.isPublished) {
    return (
      <div className="flex flex-col gap-3 h-full items-center justify-center">
        <h2 className="text-xl font-bold">Unauthorized access!</h2>
        <Link href="/documents" className={cn(buttonVariants())}>
          Return back
        </Link>
      </div>
    );
  }

  const onChange = (content: string) => {
    update({
      id: documentId,
      content,
    });
  };

  return (
    <div className="pb-[30vh]">
      <Cover preview coverImageUrl={note.coverImage} id={note._id} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={note} preview />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={note.content}
        />
      </div>
    </div>
  );
};

export default Page;
