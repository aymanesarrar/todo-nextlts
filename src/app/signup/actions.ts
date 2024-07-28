"use server";

import { prisma } from "@/lib/prisma";
import { formSchema, FormState } from "@/lib/schema";
import bcrypt from "bcrypt";

export async function signup(state: FormState, formData: FormData) {
  const validationResult = formSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }
  const { username, password } = validationResult.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return { message: "User created" };
  } catch (error) {
    return { message: "Internal Server Error" };
  }
}
