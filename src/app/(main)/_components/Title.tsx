"use client";

import { useRef, useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type TitleProps = {
  initialData: Doc<"documents">;
};
const Title = ({ initialData }: TitleProps) => {
  // declare states
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  // declare ref for input field
  const inputRef = useRef<HTMLInputElement>(null);

  // api for updating the note
  const updateDocument = useMutation(api.documents.update);

  // Event Handler
  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateDocument({
      id: initialData._id,
      title: /\S/.test(e.target.value) ? e.target.value : "Untitled", // testing if input is empty space only
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Untitled"
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button onClick={enableInput} variant="ghost" size="sm" className="">
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-6 w-24 rounded-md" />;
};
export default Title;
