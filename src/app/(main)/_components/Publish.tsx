"use client";

import { useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useOrigin } from "@/hooks/useOrigin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type PublishProps = {
  initialData: Doc<"documents">;
};

const Publish = ({ initialData }: PublishProps) => {
  // states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // hook to get the origin url
  const origin = useOrigin();

  const update = useMutation(api.documents.update);

  // url to direct public users viewing the note
  const url = `${origin}/preview/${initialData._id}`;

  // function called to publish the note for public access
  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published successfully!",
      error: "Failed to publish note!",
    });
  };

  // function called to unpublish the note
  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished successfully!",
      error: "Failed to unpublish note!",
    });
  };

  // copy the url text
  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe size={16} className="text-blue-500 ml-1.5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" alignOffset={8} className="w-72">
        {initialData.isPublished ? (
          <div className="flex flex-col gap-y-3">
            <div className="flex text-blue-500 text-xs items-center">
              <Globe size={16} className="mr-1.5 animate-pulse" />
              <span>This note is live on web.</span>
            </div>
            <div className="flex">
              <Input
                value={url}
                className="flex-1 px-2 text-xs bg-muted border truncate h-8 rounded-r-none pointer-events-none"
                disabled
              />
              <Button
                className="rounded-l-none h-8"
                onClick={onCopy}
                disabled={copied}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
            <Button size="sm" onClick={onUnpublish} disabled={isSubmitting}>
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Globe size={24} className="text-muted-foreground" />
            <p className="font-medium text-sm">Publish this note</p>
            <span className="text-muted-foreground text-xs">
              Share your work with others
            </span>
            <Button
              size="sm"
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
