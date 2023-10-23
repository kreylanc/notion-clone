"use client";

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

type DocumentListProps = {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
};
const DocumentList = ({
  parentDocumentId,
  level = 0,
  data,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();

  //   state if documents are expanded in the sidebar
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // keep track of every note that has been expanded by using document ID
  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };

  // fetch user created notes
  const documents = useQuery(api.documents.getDocument, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    // change to the documents dynamic url
    router.push(`/documents/${documentId}`);
  };

  // if its undefined; convex is fetching data
  // if null it failed
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 ? (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        ) : null}
      </>
    );
  }
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
            documentIcon={doc.icon}
          />
          {/* if expanded render this component itself  */}
          {expanded[doc._id] ? (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
