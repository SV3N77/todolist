import { useState } from "react";
import Button from "./Button";
import { useMutation, useQueryClient } from "react-query";

async function editTodoItem({ id, title, text }) {
  const editedTodo = {
    title,
    task: text,
  };

  await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedTodo),
  });
}

async function deleteTodoItem(id) {
  await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });
}

function TodoItems({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const deleteTodo = useMutation(deleteTodoItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("todolist");
    },
  });

  const editTodo = useMutation(editTodoItem, {
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries("todolist");
    },
    onError: () => {
      alert("unable to edit todo");
    },
  });

  function onDeleteTask(id) {
    deleteTodo.mutate(id);
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    editTodo.mutate({ id: todo.id, ...data });
  }

  return isEditing ? (
    <form
      className="flex h-80 grow flex-col items-center gap-5"
      onSubmit={onSubmit}
    >
      <input
        id="title"
        name="title"
        defaultValue={todo.title}
        className="border-1 mx-2 h-9 w-full rounded-md border-solid border-indigo-200 px-1  duration-100 ease-linear focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-200"
      />
      <textarea
        id="text"
        name="text"
        defaultValue={todo.task}
        className="border-1 h-full w-full resize-none rounded-md border-solid p-2  duration-100 ease-linear focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-200"
      />
      <Button type="submit">Save</Button>
    </form>
  ) : (
    <div className="flex w-full flex-col gap-4">
      <div className="rounded-lg bg-slate-200 px-2 text-lg">{todo.title}</div>
      <div className="px-2 text-sm">{todo.task}</div>
      <div className="absolute bottom-1 right-2 ml-auto flex flex-row gap-2">
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button onClick={() => onDeleteTask(todo.id)}>Delete</Button>
      </div>
    </div>
  );
}

export default TodoItems;
