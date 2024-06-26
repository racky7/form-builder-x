"use client";

import { cn } from "@/lib/utils";
import FieldCard from "./field-card";
import { Input } from "@/components/ui/input";
import { useFormBuilderContext } from "../context";
import { P, match } from "ts-pattern";
import invariant from "tiny-invariant";
import { Textarea } from "@/components/ui/textarea";
import { Fragment } from "react";
import FieldDroppable from "./field-droppable";

type EditorAreaProps = {
  className?: string;
};

export default function EditorArea({ className }: EditorAreaProps) {
  const { fieldsOrder, fieldsSchema } = useFormBuilderContext();

  return (
    <div
      className={cn(className, "flex flex-col space-y-3 w-3/4 lg:w-full pt-3")}
    >
      {fieldsOrder.map((fieldId, index) => {
        const { field, required } = fieldsSchema[fieldId];
        return (
          <Fragment key={fieldId}>
            <FieldDroppable size="slot" index={index} className="rounded-lg" />
            <FieldCard key={fieldId} fieldId={fieldId}>
              {match(field.type)
                .returnType<React.ReactNode>()
                .with("input", () => {
                  invariant(field.type === "input");
                  return match(field.inputType)
                    .returnType<React.ReactNode>()
                    .with("short-input", () => {
                      return (
                        <Input
                          placeholder={field.placeholder}
                          readOnly
                          required={required}
                          className="select-none pointer-events-none"
                        />
                      );
                    })
                    .with("long-input", () => {
                      return (
                        <Textarea
                          placeholder={field.placeholder}
                          readOnly
                          required={required}
                          className="select-none pointer-events-none"
                        />
                      );
                    })
                    .exhaustive();
                })
                .with(P._, () => null)
                .exhaustive()}
            </FieldCard>
          </Fragment>
        );
      })}
      {fieldsOrder.length === 0 ? (
        <FieldDroppable size="full-size" index={0} />
      ) : (
        <FieldDroppable size="slot" index={fieldsOrder.length} />
      )}
      <div className="p-1"></div>
    </div>
  );
}
