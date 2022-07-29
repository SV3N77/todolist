import TodoItems from "./TodoItems";
import { useQuery } from "react-query";

// GET the todo list from the server
async function getTodolist() {
  const data = await fetch("/api/items").then((res) => res.json());
  return data;
}

function TaskList() {
  // useQuery to get the todo list from the api and then render the todo items
  const { data, status } = useQuery("todolist", getTodolist, {
    refetchInterval: 5000,
  });
  // if the data is loading, show a loading message
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  // if the data is error, show an error message
  if (status === "error") {
    return <div>Error unable to load todo list</div>;
  }

  return (
    <div className="mx-4 mt-5 flex flex-row flex-wrap gap-5">
      {data.map((todo) => (
        <div
          key={todo.id}
          className="relative flex w-96 flex-row justify-center gap-2 rounded-md bg-slate-100 p-4 pb-8 shadow-md "
        >
          <TodoItems key={todo.id} todo={todo} />
          {/* passing the todo items into the todo list */}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
