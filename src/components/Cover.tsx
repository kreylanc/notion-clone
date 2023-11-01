"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type CoverProps = {
  coverImageUrl?: string;
  preview?: boolean;
  id: Id<"documents">;
};
const Cover = ({ coverImageUrl, id, preview }: CoverProps) => {
  const coverImage = useCoverImage(); // zod state hook
  const { edgestore } = useEdgeStore(); // edgestore hook

  const [isRemoving, setIsRemoving] = useState(false);

  const removeCover = useMutation(api.documents.removeCoverImage); // api to update the note

  const onRemove = async () => {
    setIsRemoving(true);

    if (coverImageUrl) {
      await edgestore.publicFiles.delete({
        url: coverImageUrl,
      });
    }

    await removeCover({ id: id });

    setIsRemoving(false);
  };
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !coverImageUrl && "h-[12vh]",
        coverImageUrl && "bg-muted"
      )}
    >
      {!!coverImageUrl && (
        <Image
          src={coverImageUrl}
          fill
          alt="cover image"
          className="object-cover"
        />
      )}
      {isRemoving && (
        <div className="flex absolute w-full h-full bg-black/40 backdrop-blur-sm items-center justify-center">
          <Loader className="text-secondary animate-spin" />
        </div>
      )}
      {coverImageUrl && !preview && (
        <div className="relative h-full md:max-w-3xl lg:max-w-4xl mx-auto">
          <div className="flex absolute divide-x divide-primary/40 bottom-3  right-4 opacity-0 group-hover:opacity-100 transition-opacity ">
            <Button
              onClick={() => coverImage.onReplace(coverImageUrl)}
              size="sm"
              variant="secondary"
              className="h-7 text-xs text-muted-foreground rounded-r-none"
            >
              Change Cover
            </Button>
            <Button
              onClick={onRemove}
              size="sm"
              variant="secondary"
              className="h-7 text-xs text-muted-foreground rounded-l-none"
            >
              Remove Cover
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};

export default Cover;
