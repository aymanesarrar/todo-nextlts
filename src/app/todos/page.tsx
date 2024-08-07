import { Todo } from "@prisma/client";
import { getTodos } from "./actions";
import moment from "moment";

export default async function Todos() {
  const data = await getTodos();
  console.log(data);
  return (
    <div>
      {data?.todos?.map((todo: Todo) => {
        return (
          <div>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <p>{moment(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        );
      })}
    </div>
  );
}
