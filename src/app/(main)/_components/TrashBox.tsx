"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FileIcon, Search, Trash2, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";

const TrashBox = () => {
  const router = useRouter();
  // state for input field
  const [search, setSearch] = useState("");

  // Call API end points
  const archivedNotes = useQuery(api.documents.getArchived);
  const restoreNote = useMutation(api.documents.restore);
  const removeNote = useMutation(api.documents.remove);

  // event handlers

  // route to the note page on click
  const onClickRoute = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  // event for restoring archived note
  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restoreNote({ id });

    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  // event for deleting note from DB
  const onDelete = (id: Id<"documents">) => {
    const promise = removeNote({ id });

    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note permanently deleted!",
      error: "Failed to delete note.",
    });
  };

  return (
    <>
      <div className="flex items-center gap-x-1 px-1 my-2">
        <Search size={18} className="text-muted-foreground" />
        <Input
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title..."
          className="h-7 px-1 py-0 bg-secondary focus-visible:ring-transparent"
        />
      </div>
      <div className="mt-4 px-1 pb-1">
        <p className="last:block hidden text-xs text-center text-muted-foreground">
          No notes found.
        </p>
        {archivedNotes?.map((note) => (
          <div
            key={note._id}
            role="button"
            onClick={() => onClickRoute(note._id)}
            className="flex items-center px-2 hover:bg-primary/5 text-primary rounded-sm cursor-default transition"
          >
            {note.icon ? (
              <div className="mr-2 w-4 h-4">{note.icon}</div>
            ) : (
              <FileIcon size={16} className="mr-2 text-muted-foreground" />
            )}
            <span className="truncate">{note.title}</span>
            <div className="flex items-center justify-end ml-auto">
              <div
                onClick={(e) => onRestore(e, note._id)}
                role="button"
                className="rounded-sm p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <Undo2 size={18} />
              </div>
              <ConfirmModal onConfirm={() => onDelete(note._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  <Trash2 size={18} />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrashBox;
