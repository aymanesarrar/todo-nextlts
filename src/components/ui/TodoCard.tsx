"use client";
import { deleteTodo } from "@/app/todos/actions";
import { ITodoProps } from "@/lib/schema";
import { FaTrashAlt } from "react-icons/fa";
export default function TodoCard({
  todoId,
  title,
  
  createdAt,
}: ITodoProps) {
  const deleteT = async () => {
    await deleteTodo(todoId);
  }
  return (
    <div className="flex justify-between items-center bg-zinc-500 p-4">
      <span>{title}</span>
      <p>{createdAt}</p>
      <FaTrashAlt onClick={deleteT} className="cursor-pointer text-red-500 font-bold" />
    </div>
  );
}
