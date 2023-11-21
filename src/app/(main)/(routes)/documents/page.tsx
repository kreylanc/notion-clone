"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const createDocument = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = createDocument({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col gap-2 items-center justify-center">
      <Image
        src="/empty.png"
        alt="empty"
        height="1024"
        width="768"
        className="dark:hidden w-[300px] object-contain"
      />
      <Image
        src="/empty-dark.png"
        alt="empty"
        height="1024"
        width="768"
        className="hidden dark:block w-[300px] object-contain"
      />
      <h1 className="text-xl font-medium">
        Welcome to{" "}
        <span className="text-blue-600">{user?.username}&apos;s</span> Notion
      </h1>
      <Button onClick={onCreate} className="mt-2">
        <PlusCircle className="mr-1.5" size={16} />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentPage;
