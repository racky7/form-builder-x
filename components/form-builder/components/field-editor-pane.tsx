"use client";

import { Label } from "@/components/ui/label";
import { useFormBuilderContext } from "../context";
import TiptapEditor from "@/components/tiptap-editor/tiptap-editor";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function FieldEditorPane() {
  const { activeField } = useFormBuilderContext();
  if (!activeField) {
    return (
      <div className="w-72 h-full p-4 text-sm">
        Select an field to edit its content
      </div>
    );
  }
  return (
    <div className="w-72 h-fit p-4 text-sm grid space-y-8">
      <div className="space-y-2">
        <Label>Question</Label>
        <TiptapEditor />
      </div>
      <div className="space-y-2">
        <Label>Placeholder</Label>
        <Input value="Your Placeholder Text" />
      </div>
      <div className="items-top flex space-x-2">
        <Checkbox id="required_check" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="required_check"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Required field
          </label>
          <p className="text-sm text-muted-foreground">
            If checked, users will be required to complete this field.
          </p>
        </div>
      </div>
    </div>
  );
}
