"use client";
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { createTodo } from "../actions"

export const CreateTodoForm = () => {
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: "No priority"
        }
    })
    return <Form {...form}>
        <form>

        </form>
    </Form>
}