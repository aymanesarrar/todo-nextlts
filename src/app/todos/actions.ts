"use server"

import { prisma } from "@/lib/prisma";
import { FormState } from "@/lib/schema";
import { verifySession } from "@/lib/session";

export async function createTodo(state: FormState, formData: FormData) {
    const session = await verifySession();
    if (!session) {
        return { errors: { session: ["Session not found"] } };
    }
    const payload = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
    }

    const todo = await prisma.todo.create({
        data: {
            title: payload.title,
            description: payload.description,
            userId: session.userId
        }
    })
    return { todo };
}