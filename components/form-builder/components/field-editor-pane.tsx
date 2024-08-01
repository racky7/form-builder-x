"use client";

import { Label } from "@/components/ui/label";
import TiptapEditor from "@/components/tiptap-editor/tiptap-editor";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { P, match } from "ts-pattern";
import invariant from "tiny-invariant";
import { useFormBuilderContext } from "@/context";
import { CirclePlusIcon, DeleteIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { uid } from "uid";

export default function FieldEditorPane() {
  const { activeField, fieldsSchema, fieldsOrder, updateFieldSchema } =
    useFormBuilderContext();
  if (fieldsOrder.length === 0) {
    return (
      <div className="w-72 h-full flex items-center justify-center p-4 text-xs">
        Field editor options will appear here.
      </div>
    );
  }
  if (!activeField) {
    return (
      <div className="w-72 h-full flex items-center justify-center p-4 text-xs">
        Select an field to edit its content
      </div>
    );
  }

  const { field, required } = fieldsSchema[activeField];

  return (
    <div className="w-72 h-full border-l">
      <div className=" p-4 text-sm grid space-y-8 ">
        <div className="space-y-2">
          <Label>Field Label</Label>
          <TiptapEditor
            key={activeField}
            value={fieldsSchema[activeField].name}
            onChange={(updatedValue) => {
              updateFieldSchema(activeField, {
                name: updatedValue,
              });
            }}
          />
        </div>
        {match(field.type)
          .returnType<React.ReactNode>()
          .with("input", () => {
            invariant(field.type === "input");
            return (
              <>
                <div className="space-y-2">
                  <Label>Placeholder Text</Label>
                  <Input
                    value={field.placeholder}
                    className="focus-within:ring-gray-500 focus-within:border-gray-500"
                    onChange={(event) => {
                      const updatedValue = event.target.value;
                      updateFieldSchema(activeField, {
                        field: { ...field, placeholder: updatedValue },
                      });
                    }}
                  />
                </div>
              </>
            );
          })
          .with("dropdown", () => {
            invariant(field.type === "dropdown");
            console.log(field);
            return (
              <>
                <div className="space-y-2">
                  <Label>Placeholder Text</Label>
                  <Input
                    value={field.placeholder}
                    className="focus-within:ring-gray-500 focus-within:border-gray-500"
                    onChange={(event) => {
                      const updatedValue = event.target.value;
                      updateFieldSchema(
                        activeField,
                        {
                          field: { ...field, placeholder: updatedValue },
                        },
                        "replace"
                      );
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Option</Label>
                    <button
                      onClick={() => {
                        updateFieldSchema(activeField, {
                          field: {
                            ...field,
                            options: [
                              {
                                _id: uid(),
                                name: "",
                              },
                            ],
                          },
                        });
                      }}
                    >
                      <CirclePlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  {field.options.length === 0 ? (
                    <div>No options added</div>
                  ) : (
                    field.options.map((item) => {
                      return (
                        <div
                          className="flex h-9 items-center bg-white"
                          key={item._id}
                        >
                          <Input
                            value={item.name}
                            className="rounded-r-none focus-within:ring-gray-500 focus-within:border-gray-500"
                            onChange={(event) => {
                              const updatedValue = event.target.value;
                              if (typeof updatedValue === "undefined") {
                                return;
                              }
                              const updatedOptions = field.options.map(
                                (option) => {
                                  if (option._id === item._id) {
                                    return {
                                      _id: option._id,
                                      name: updatedValue,
                                    };
                                  }
                                  return option;
                                }
                              );
                              updateFieldSchema(
                                activeField,
                                {
                                  field: {
                                    ...field,
                                    options: updatedOptions,
                                  },
                                },
                                "replace"
                              );
                            }}
                          />
                          <button
                            className="py-1 px-3 border border-input border-l-0 rounded-r-md h-full"
                            onClick={() => {
                              const updatedOptions = field.options.filter(
                                (option) => option._id !== item._id
                              );
                              updateFieldSchema(
                                activeField,
                                {
                                  field: {
                                    ...field,
                                    options: updatedOptions,
                                  },
                                },
                                "replace"
                              );
                            }}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            );
          })
          .with("checkboxes", () => {
            invariant(field.type === "checkboxes");
            return (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Option</Label>
                    <button
                      onClick={() => {
                        updateFieldSchema(activeField, {
                          field: {
                            ...field,
                            options: [
                              {
                                _id: uid(),
                                name: "Option",
                                value: false,
                              },
                            ],
                          },
                        });
                      }}
                    >
                      <CirclePlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  {field.options.length === 0 ? (
                    <div>No options added.</div>
                  ) : (
                    field.options.map((item) => {
                      return (
                        <div
                          className="flex h-9 items-center bg-white"
                          key={item._id}
                        >
                          <Input
                            value={item.name}
                            className="rounded-r-none focus-within:ring-gray-500 focus-within:border-gray-500"
                            onChange={(event) => {
                              const updatedValue = event.target.value;
                              if (typeof updatedValue === "undefined") {
                                return;
                              }
                              const updatedOptions = field.options.map(
                                (option) => {
                                  if (option._id === item._id) {
                                    return {
                                      ...option,
                                      name: updatedValue,
                                    };
                                  }
                                  return option;
                                }
                              );
                              updateFieldSchema(
                                activeField,
                                {
                                  field: {
                                    ...field,
                                    options: updatedOptions,
                                  },
                                },
                                "replace"
                              );
                            }}
                          />
                          <button
                            className="py-1 px-3 border border-input border-l-0 rounded-r-md h-full"
                            onClick={() => {
                              const updatedOptions = field.options.filter(
                                (option) => option._id !== item._id
                              );
                              updateFieldSchema(
                                activeField,
                                {
                                  field: {
                                    ...field,
                                    options: updatedOptions,
                                  },
                                },
                                "replace"
                              );
                            }}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            );
          })
          .with(P._, () => null)
          .exhaustive()}

        <div className="items-top flex space-x-2">
          <Checkbox
            id="required_check"
            checked={required}
            onCheckedChange={(updatedValue: boolean) => {
              updateFieldSchema(activeField, {
                required: updatedValue!,
              });
            }}
          />
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
    </div>
  );
}
