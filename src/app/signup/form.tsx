"use client";

import { signup } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { formSchema } from "@/lib/schema";
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
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";

export function SignupForm() {
  const [state, action, pending] = useFormState(signup, undefined);
  const [isFocused, setIsFocused] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form
        action={(values) => {
          setIsFocused(false);
          action(values);
        }}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    onFocus={() => setIsFocused(true)}
                  />
                </FormControl>
                {state?.errors && state?.errors.username && !isFocused && (
                  <FormMessage>{state.errors.username}</FormMessage>
                )}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    onFocus={() => setIsFocused(true)}
                  />
                </FormControl>
                {state?.errors && state?.errors.password && !isFocused && (
                  <FormMessage>{state.errors.password}</FormMessage>
                )}
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="mt-4 w-full" disabled={pending}>
          {pending ? <ImSpinner8 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
