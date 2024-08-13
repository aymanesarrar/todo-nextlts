
import TodoCard from "@/components/ui/TodoCard";
import { getTodos } from "./actions";
import { Logout } from "./Logout";
import { Todo } from "@prisma/client";
import moment from "moment";
import { CreateTodo } from "./CreateTodo";


export default async function Todos() {
  const data = await getTodos();
  console.log(data);
  return (
    <div className="">
      <div className="bg-zinc-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl">todos</h1>
        <Logout />
      </div>
      <CreateTodo />
      {data?.todos?.map((todo: Todo) => {
        return (
          <TodoCard
            key={todo.id}
            title={todo.title}
            createdAt={moment(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          />
        );
      })}
    </div>
  );
}
