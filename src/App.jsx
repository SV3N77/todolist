import { useState } from "react";
import EnterTask from "./EnterTask";
import TaskList from "./TaskList";

function App() {
  const [todolist, setTodolist] = useState([]);

  function onAddTask(id) {
    setTodolist([...todolist, id]);
  }

  function onDeleteTask(id) {
    setTodolist(todolist.filter((t) => t.id !== id));
  }

  function onEditTask(id, title, text) {
    setTodolist(
      todolist.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
          todo.task = text;
        }
        return todo;
      })
    );
  }

  return (
    <div className="mx-auto my-0 min-h-screen bg-zinc-50">
      <header className="text-4xl text-center font-bold py-10 bg-gradient-to-br from-teal-100 to-green-200 ">
        To Do List
      </header>
      <main>
        <EnterTask onAddTask={onAddTask} />
        <TaskList
          todolist={todolist}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      </main>
    </div>
  );
}

export default App;
