import { ITodoProps } from "@/lib/schema";

export default function TodoCard({
  title,
  
  createdAt,
}: ITodoProps) {
  return (
    <div className="flex justify-between items-center bg-zinc-500 p-4">
      <span>{title}</span>
      
      <p>{createdAt}</p>
    </div>
  );
}
