"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTodo } from "./actions";
import { useFormState } from "react-dom";

export const CreateTodo = () => {
  const [state, action, pending] = useFormState(createTodo, undefined);
  const form = useForm({
    defaultValues: {
      title: "",
    },
  });
  return (
    <Form {...form}>
      <form
        action={(values) => {
          action(values);
          form.reset();
        }}
        className="max-w-[680px] mx-auto flex flex-col gap-2 pt-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              
              <FormControl>
                <Input placeholder="insert your todo ..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
