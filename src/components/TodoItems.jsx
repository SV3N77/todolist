import { useState } from "react";
import Button from "./Button";
import { useMutation, useQueryClient } from "react-query";

// Function to edit a todo item with the editTodoItem function in the backend API
// and the query client
// getting the id from the todo object
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
// delete the todo item from the server by id
async function deleteTodoItem(id) {
  await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });
}

function TodoItems({ todo }) {
  // Saving state for isEditing
  const [isEditing, setIsEditing] = useState(false);
  // Access the query client in app
  const queryClient = useQueryClient();
  // Mutate the todo list with the deleteTodoItem function
  // invalidate the query client to refresh the list
  const deleteTodo = useMutation(deleteTodoItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("todolist");
    },
  });
  // Mutate the todo list with the editTodoItem function
  // invalidate the query client to refresh the list
  // with error handling if the put fails
  const editTodo = useMutation(editTodoItem, {
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries("todolist");
    },
    onError: () => {
      alert("unable to edit todo");
    },
  });
  // function to pass id into the deletetodo function
  function onDeleteTask(id) {
    deleteTodo.mutate(id);
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // call the mutation function with the form data and the id
    editTodo.mutate({ id: todo.id, ...data });
  }
  // Ternary to determine if the form is editing or not and render the form or the todo item
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
