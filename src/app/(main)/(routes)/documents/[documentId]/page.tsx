"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import Toolbar from "@/components/Toolbar";

type Props = {
  params: {
    documentId: Id<"documents">;
  };
};
const Page = ({ params: { documentId } }: Props) => {
  const note = useQuery(api.documents.getDocById, { id: documentId });

  if (note === undefined) {
    return <Skeleton className="md:max-w-3xl lg:max-w-4xl mx-auto h-6 w-20" />;
  }

  if (note === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-[30vh]">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={note} />
      </div>
    </div>
  );
};

export default Page;
