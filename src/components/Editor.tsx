"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  Theme,
  useBlockNote,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

type EditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });

    return res.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    domAttributes: {
      // Adds a class to all `blockContainer` elements.
      inlineContent: {
        class: "block-container",
      },
    },
    uploadFile: handleUpload,
  });

  // Default dark theme with additional component styles.
  const darkTheme = {
    ...darkDefaultTheme,
    colors: {
      ...darkDefaultTheme.colors,
      editor: {
        text: "#D4D4D4",
        background: "#171717",
      },
    },
    // Makes all hovered dropdown & menu items blue.
  } satisfies Theme;

  //  casting the type that matches to Emoji Picker prop value
  return (
    <BlockNoteView
      className="mt-6"
      editor={editor}
      theme={resolvedTheme === "dark" ? darkTheme : "light"}
    />
  );
};

export default Editor;
