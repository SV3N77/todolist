import { useState } from "react";
import Button from "./Button";

function TodoItems({ todo, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onEditTask(todo.id, data.title, data.text);
    setIsEditing(false);
  }

  return isEditing ? (
    <form className="flex flex-col grow gap-3 items-center" onSubmit={onSubmit}>
      <input
        id="title"
        name="title"
        defaultValue={todo.title}
        className="px-1 mx-2 w-4/5 h-9 border-solid border-indigo-200 border-1 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
      />
      <textarea
        id="text"
        name="text"
        defaultValue={todo.task}
        className="resize-none p-2 w-full h-full border-solid border-1 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
      />
      <Button type="submit">Save</Button>
    </form>
  ) : (
    <div className="flex flex-col gap-3 w-full">
      <div className="text-lg bg-slate-300 px-2 rounded-lg">{todo.title}</div>
      <div className="text-sm px-1">{todo.task}</div>
      <div className="flex flex-row gap-2 ml-auto absolute bottom-1 right-2">
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button onClick={() => onDeleteTask(todo.id)}>Delete</Button>
      </div>
    </div>
  );
}

export default TodoItems;
