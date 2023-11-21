import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { MoreHorizontalIcon, Trash2 } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Menu = ({ docId }: { docId: Id<"documents"> }) => {
  const { user } = useUser();

  const archiveNote = useMutation(api.documents.archive);
  const onArchive = () => {
    const promise = archiveNote({ id: docId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to delete note.",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={onArchive}>
          <Trash2 className="mr-2" size={16} />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-1.5">
          Last edited by: {user?.fullName || user?.username}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
