import { ITodoProps } from "@/lib/schema";

export default function TodoCard({
  title,
  
  createdAt,
}: ITodoProps) {
  return (
    <div>
      <span>{title}</span>
      
      <p>{createdAt}</p>
    </div>
  );
}
