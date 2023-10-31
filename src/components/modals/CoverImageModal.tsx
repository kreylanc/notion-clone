"use client";

import { useCoverImage } from "@/hooks/useCoverImage";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "../SingleImageDropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { Id } from "../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const CoverImageModal = () => {
  const params = useParams();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();

  // convex api
  const update = useMutation(api.documents.update);

  const onClose = () => {
    setIsSubmitting(false);
    setFile(undefined);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  const coverImage = useCoverImage();
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader className="font-bold text-center items-center">
          Cover Image
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          value={file}
          onChange={onChange}
          disabled={isSubmitting}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 2, // 2 MB
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
