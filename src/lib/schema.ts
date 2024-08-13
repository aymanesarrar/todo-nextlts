import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "username must be at least 5 characters" })
    .max(20, { message: "username must be at most 20 characters" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export interface ITodoProps {
  title: string;
  createdAt: string;
}
