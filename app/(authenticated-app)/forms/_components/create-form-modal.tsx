"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const newFormConfig = z.object({
  name: z.string(),
});

export default function CreateFormModal() {
  const form = useForm<z.infer<typeof newFormConfig>>({
    defaultValues: {
      name: "My Form",
    },
  });
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="h-4 w-4 mr-1" /> <div>New Form</div>
          </Button>
        </DialogTrigger>
        <Form {...form}>
          <form>
            <DialogContent showCloseButton={false}>
              <DialogHeader className="space-y-3 pb-4">
                <DialogTitle>Form Name</DialogTitle>
                <DialogDescription>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Form</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </Dialog>
    </div>
  );
}
