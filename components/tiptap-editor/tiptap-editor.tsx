"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "min-h-14 h-auto p-1 border border-input rounded-sm",
      },
    },
    content: "Field Name",
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}
