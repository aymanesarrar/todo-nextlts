'use server';

import { formSchema, FormState } from "@/lib/schema";

export async function signup(state: FormState, formData: FormData) {
    const validationResult = formSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })
    if (!validationResult.success) {
        return { errors: validationResult.error.flatten().fieldErrors }
    }
}