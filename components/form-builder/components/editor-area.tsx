"use client";

import { cn } from "@/lib/utils";
import FieldCard from "./field-card";
import { Input } from "@/components/ui/input";
import { useFormBuilderContext } from "../context";
import { P, match } from "ts-pattern";
import invariant from "tiny-invariant";
import { Textarea } from "@/components/ui/textarea";

type EditorAreaProps = {
  className?: string;
};

export default function EditorArea({ className }: EditorAreaProps) {
  const { fieldsOrder, fieldsSchema } = useFormBuilderContext();
  console.log(fieldsOrder);
  return (
    <div
      className={cn(className, "flex flex-col space-y-3 w-3/4 lg:w-full pt-3")}
    >
      {fieldsOrder.map((fieldId) => {
        const { field, required } = fieldsSchema[fieldId];
        return (
          <>
            {match(field.type)
              .returnType<React.ReactNode>()
              .with("input", () => {
                invariant(field.type === "input");
                return match(field.inputType)
                  .returnType<React.ReactNode>()
                  .with("short-input", () => {
                    return (
                      <FieldCard key={fieldId} fieldId={fieldId}>
                        <Input
                          placeholder={field.placeholder}
                          readOnly
                          required={required}
                          className="select-none pointer-events-none"
                        />
                      </FieldCard>
                    );
                  })
                  .with("long-input", () => {
                    return (
                      <FieldCard key={fieldId} fieldId={fieldId}>
                        <Textarea
                          placeholder={field.placeholder}
                          readOnly
                          required={required}
                          className="select-none pointer-events-none"
                        />
                      </FieldCard>
                    );
                  })
                  .exhaustive();
              })
              .with(P._, () => null)
              .exhaustive()}
          </>
        );
      })}
      <div className="p-1"></div>
    </div>
  );
}
