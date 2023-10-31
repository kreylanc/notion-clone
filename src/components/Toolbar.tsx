import { ImageIcon, Smile, X } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import IconPicker from "./IconPicker";
import { Button } from "./ui/button";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/useCoverImage";

type ToolbarProps = {
  initialData: Doc<"documents">;
  preview?: boolean;
};

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  // ref for textarea
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false); // state for when editing the content
  const [value, setValue] = useState(initialData.title);
  // state from Zustand
  const coverImage = useCoverImage();
  // api for updating the notes
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  // =========== Event Handler =============

  // enale input area when clicked
  const enableInput = () => {
    // not editable when user is previewing
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);

    inputRef.current?.focus();
  };
  const disableInput = () => {
    setIsEditing(false);
  };

  // when user inputs value on textarea
  const onInput = (value: string) => {
    setValue(value);

    update({
      id: initialData._id,
      title: /\S/.test(value) ? value : "Untitled",
    });
  };

  // when pressed enter key
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  // on emoji select
  const onChange = (icon: string) => {
    update({
      id: initialData._id,
      icon: icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };

  return (
    <div className="pl-[54px] mt-10 group relative">
      {!!initialData.icon && !preview && (
        <div className="inline-flex relative items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onChange}>
            <span className="text-6xl group-hover/icon:bg-secondary transition">
              {initialData.icon}
            </span>
          </IconPicker>
          <Button
            variant="ghost"
            onClick={onRemoveIcon}
            className="absolute rounded-full p-1 w-8 h-8 hover:bg-destructive/10 top-0 -right-3 opacity-0 group-hover/icon:opacity-100 transition-opacity"
          >
            <X size={16} className="text-red-500" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <div className="text-6xl pt-6">{initialData.icon}</div>
      )}
      <div className="opacity-0 group-hover:opacity-100 text-xs transition flex items-center mt-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onChange}>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Smile size={16} className="mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <ImageIcon size={16} className="mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="resize-none text-4xl lg:text-5xl font-bold break-words bg-transparent outline-none mt-2"
        />
      ) : (
        <h1
          onClick={enableInput}
          className="text-4xl lg:text-5xl font-bold mt-2"
        >
          {initialData.title}
        </h1>
      )}
    </div>
  );
};

export default Toolbar;
