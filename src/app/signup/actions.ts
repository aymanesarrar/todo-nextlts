"use server";

import { prisma } from "@/lib/prisma";
import { formSchema, FormState } from "@/lib/schema";
import { createSession, deleteSession } from "@/lib/session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

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
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  if (!user) {
    return { errors: { username: ["Username already exists"] } };
  }
  createSession(user.uid);
  redirect("/todos");
}

export async function signin(state: FormState, formData: FormData) {
  const payload = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  const { username, password } = payload;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    return { errors: { username: ["User not found"] } };
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    return { errors: { password: ["Password incorrect"] } };
  }
  createSession(user.uid);
  redirect("/todos");
}

export async function logout() {
  deleteSession();
  return { message: "Logged out" };
}
