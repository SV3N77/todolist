import { useState } from "react";
import "./App.css";

function EnterTask({ onAddTask }) {
  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newToD0 = {
      id: new Date().getTime(),
      task: data.text,
    };
    onAddTask(newToD0);
    e.target.reset();
  }

  return (
    <div className="flex flex-row justify-center gap-6 mt-10">
      <form onSubmit={onSubmit}>
        <label className="mr-2" htmlFor="text">
          Enter Task:
        </label>
        <input
          id="text"
          name="text"
          type="text"
          className="px-1 mr-4 border-solid border-indigo-200 border-2 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
        />
        <button
          type="submit"
          className="rounded-md p-1 text-xs border-solid border-1 shadow-sm shadow-indigo-500 border-indigo-400 bg-indigo-200/40 hover:opacity-60"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

function TaskList({ todolist, onDeleteTask }) {
  return (
    <div className="flex flex-col mt-5 gap-5">
      {todolist.map((todo) => (
        <div
          key={todo.id}
          className="text-ms flex flex-row gap-40 mx-auto shadow-md bg-gray-200 rounded-md p-2"
        >
          {todo.task}
          <div className="flex flex-row gap-5">
            <button className="rounded-md p-1 text-xs border-solid border-1 shadow-sm shadow-indigo-500 border-indigo-400 bg-indigo-200/40 hover:opacity-60">
              Edit
            </button>
            <button
              onClick={() => onDeleteTask(todo.id)}
              className="rounded-md p-1 text-xs border-solid border-1 shadow-sm shadow-indigo-500 border-indigo-400 bg-indigo-200/40 hover:opacity-60"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [todolist, setTodolist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentToDo, setCurrentToDo] = useState("");

  function onAddTask(id) {
    setTodolist([...todolist, id]);
  }

  function onDeleteTask(id) {
    setTodolist(todolist.filter((t) => t.id !== id));
  }

  return (
    <div className="mx-auto my-0 min-h-screen">
      <header className="text-4xl text-center font-bold py-10  bg-gradient-to-br from-indigo-300 to-green-200 ">
        To Do List
      </header>
      <main>
        <EnterTask onAddTask={onAddTask} />
        <TaskList todolist={todolist} onDeleteTask={onDeleteTask} />
      </main>
    </div>
  );
}

export default App;
