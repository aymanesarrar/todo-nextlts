"use server";

import { prisma } from "@/lib/prisma";
import { FormState } from "@/lib/schema";
import { verifySession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createTodo(state: any, formData: FormData) {
  const session = await verifySession();
  if (!session) {
    return { errors: { session: ["Session not found"] } };
  }
  const payload = {
    title: formData.get("title") as string,
  };

  const todo = await prisma.todo.create({
    data: {
      title: payload.title,
      
     
      userId: session.userId,
    },
  });
  revalidatePath("/todos");
  return { todo };
}

export async function getTodos() {
  const session = await verifySession();
  if (!session) {
    return { errors: { session: ["Session not found"] } };
  }
  const todos = await prisma.todo.findMany({
    where: {
      userId: session.userId,
    },
  });
  return { todos };
}

export async function deleteTodo(todoId: number) {
  const session = await verifySession();
  if (!session) {
    return { errors: { session: ["Session not found"] } };
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
  if (!todo) {
    return { errors: { todo: ["Todo not found"] } };
  }
  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
  return { message: "Todo deleted" };
}
