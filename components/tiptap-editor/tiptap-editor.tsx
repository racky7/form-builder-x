"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TiptapEditorProps = {
  value: string;
  onChange?: (value: string) => void;
};

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "min-h-14 h-auto p-1 border border-input rounded-md",
      },
    },
    content: value,
    onUpdate: () => {
      const html = editor?.getHTML();
      if (html) {
        onChange?.(html);
      }
    },
  });

  return (
    <div className="min-h-14">
      <EditorContent
        editor={editor}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
}
