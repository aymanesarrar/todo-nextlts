import { ITodoProps } from "@/lib/schema";

export default function TodoCard({
  title,
  description,
  createdAt,
}: ITodoProps) {
  return (
    <div>
      <span>{title}</span>
      <p>{description}</p>
      <p>{createdAt}</p>
    </div>
  );
}
