import { Todo } from "@prisma/client";
import { getTodos } from "./actions";
import moment from "moment";
import TodoCard from "@/components/ui/TodoCard";

export default async function Todos() {
  const data = await getTodos();
  console.log(data);
  return (
    <div className="max-w-[680px] mx-auto border-black border-2 border-solid">
      {data?.todos?.map((todo: Todo) => {
        return (
          <TodoCard
            key={todo.id}
            title={todo.title}
            description={todo.description}
            createdAt={moment(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          />
        );
      })}
    </div>
  );
}
