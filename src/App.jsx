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
    <div className="flex flex-row justify-center gap-6 -mt-6">
      <form
        className="flex w-3/4 p-1 justify-center items-center"
        onSubmit={onSubmit}
      >
        <label className="" htmlFor="text">
          Enter Task:
        </label>
        <input
          id="text"
          name="text"
          type="text"
          placeholder="New Todo"
          className="px-1 ml-2 w-4/5 h-9 border-solid border-indigo-200 border-1 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
        />
        <Button type="submit">Add Task</Button>
      </form>
    </div>
  );
}

function TaskList({
  todolist,
  onDeleteTask,
  onEditTask,
  currentToDo,
  onEditTaskDone,
}) {
  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onEditTaskDone(data.text);
  }

  return (
    <div className="flex flex-col mt-5 gap-5">
      {todolist.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-row justify-center mx-auto gap-2 p-4 pb-8 w-96 relative shadow-md bg-gray-200 rounded-md "
        >
          {todo.id === currentToDo ? (
            <form
              className="flex flex-col gap-3 w-96 items-center"
              onSubmit={onSubmit}
            >
              <input
                id="text"
                type="text"
                name="text"
                className="w-full h-10 px-2 py-1 border-solid border-1 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
              />
              <Button onClick={onsubmit}>Save</Button>
            </form>
          ) : (
            <div className="text-sm">
              {todo.task}
              <div className="flex flex-row gap-2 ml-auto absolute bottom-1 right-2">
                <Button onClick={() => onEditTask(todo.id)}>Edit</Button>
                <Button onClick={() => onDeleteTask(todo.id)}>Delete</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className=" rounded-sm p-1 text-xs border-solid border-1 shadow-sm shadow-indigo-500 border-indigo-400 bg-indigo-100 hover:bg-indigo-200"
    >
      {children}
    </button>
  );
}

function App() {
  const [todolist, setTodolist] = useState([]);
  const [currentToDo, setCurrentToDo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  function onAddTask(id) {
    setTodolist([...todolist, id]);
  }

  function onDeleteTask(id) {
    setTodolist(todolist.filter((t) => t.id !== id));
  }

  function onEditTask(id) {
    setIsEditing(true);
    setCurrentToDo(id);
  }

  function onEditTaskDone(text) {
    setTodolist(
      todolist.map((todo) => {
        if (todo.id === currentToDo) {
          todo.task = text;
        }
        return todo;
      })
    );

    setCurrentToDo(null);
    setIsEditing(false);
  }

  return (
    <div className="mx-auto my-0 min-h-screen bg-zinc-100">
      <header className="text-4xl text-center font-bold py-10 bg-gradient-to-br from-teal-100 to-green-200 ">
        To Do List
      </header>
      <main>
        <EnterTask onAddTask={onAddTask} />
        <TaskList
          todolist={todolist}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          currentToDo={currentToDo}
          onEditTaskDone={onEditTaskDone}
        />
      </main>
    </div>
  );
}

export default App;
