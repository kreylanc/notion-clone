"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useRouter } from "next/navigation";

const Banner = ({ docId }: { docId: Id<"documents"> }) => {
  const router = useRouter();
  // api for restoring and deleting note
  const restoreNote = useMutation(api.documents.restore);
  const removeNote = useMutation(api.documents.remove);

  const onRestore = () => {
    const promise = restoreNote({ id: docId });

    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  const onRemove = () => {
    const promise = removeNote({ id: docId });

    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note permanently deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };
  return (
    <div className="bg-red-600 text-neutral-50 text-sm flex justify-center items-center gap-x-4 p-2">
      <p>This page is in the trash.</p>
      <Button
        onClick={onRestore}
        variant="outline"
        size="sm"
        className="hover:bg-primary/5 hover:text-neutral-50 border-neutral-200"
      >
        Restore Page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary/5 hover:text-neutral-50 border-neutral-200"
        >
          Delete Permanently
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
