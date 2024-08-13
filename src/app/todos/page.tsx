
import { getTodos } from "./actions";
import { Logout } from "./Logout";


export default async function Todos() {
  const data = await getTodos();
  console.log(data);
  return (
    <div className="border-black border-2 border-solid">
      {/* {data?.todos?.map((todo: Todo) => {
        return (
          <TodoCard
            key={todo.id}
            title={todo.title}
            createdAt={moment(todo.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          />
        );
      })} */}
      <div className="bg-zinc-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl">todos</h1>
        <Logout />
      </div>
    </div>
  );
}
