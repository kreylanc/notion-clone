"use client";

import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ItemProps = {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
};

const Item = ({
  onClick,
  icon: Icon,
  label,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // stop the page routing that happens from the parent element
    event.stopPropagation();
    onExpand?.();
  };

  // create new document inside the parent document
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/10 flex items-center text-muted-foreground font-medium transition",
        active && "bg-primary/5 text-primary"
      )}
    >
      {/* Icon for expanding the document */}
      {!!id && (
        <div
          onClick={handleExpand}
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 p-0.5"
        >
          <ChevronIcon
            size={16}
            className="shrink-0 text-muted-foreground/50"
          />
        </div>
      )}
      {/* Display the user set icon else display a default doc icon */}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground " />
      )}
      {/* Note title */}
      <span className="truncate">{label}</span>
      {/* This section used only by the search element */}
      {isSearch ? (
        <kbd className="ml-auto justify-end pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 text-muted-foreground">
          <span className="text-xs">Ctrl+K</span>
        </kbd>
      ) : null}
      {/* Icon for adding a new note inside the current note */}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 p-0.5 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus size={16} />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
