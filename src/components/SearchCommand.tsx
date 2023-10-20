"use client";

import { useUser } from "@clerk/clerk-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useEffect, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchCommand = () => {
  // user info hook from clerk
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  // fetch all the notes in DB
  const documents = useQuery(api.documents.documentsByUser);

  // states from zustand store
  const isOpen = useSearch((state) => state.isOpen);
  const onClose = useSearch((state) => state.onClose);
  const toggle = useSearch((state) => state.toggle);

  // route to the note page when it is selected
  const onSelect = (id: string) => {
    router.push(`documents/${id}`);

    onClose();
  };

  // to resolve hydration issue only set to true after the component has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // keyboard command
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // if Ctrl or Cmd + K is pressed
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.fullName ?? user?.username}'s Notion...`}
      />
      <CommandList className="">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Notes">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={() => onSelect(doc._id)}
              className="hover:bg-primary/5 cursor-pointer"
            >
              {doc.icon ? (
                <div className="mr-2 text-[18px]">{doc.icon}</div>
              ) : (
                <FileIcon size={16} className="mr-2" />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
