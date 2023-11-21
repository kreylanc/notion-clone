"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "../Title";
import Banner from "./Banner";
import Menu from "./Menu";
import Publish from "../Publish";

type HeaderProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const DocHeader = ({ isCollapsed, onResetWidth }: HeaderProps) => {
  const { documentId } = useParams();

  const note = useQuery(api.documents.getDocById, {
    id: documentId as Id<"documents">,
  });

  if (note === undefined) {
    return (
      <div className="flex justify-between w-full items-center px-3 mt-0.5 py-2 gap-x-4">
        <Title.Skeleton />
      </div>
    );
  }

  if (note === null) {
    return null;
  }

  return (
    <>
      <div className="flex w-full bg-primary-foreground items-center px-3 py-2 gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={note} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={note} />
            <Menu docId={note._id} />
          </div>
        </div>
      </div>

      {note.isArchived ? <Banner docId={note._id} /> : null}
    </>
  );
};

export default DocHeader;
