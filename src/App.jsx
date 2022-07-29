import EnterTask from "./components/EnterTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="mx-auto my-0 min-h-screen bg-zinc-50">
      <header className="bg-gradient-to-br from-teal-100 to-green-200 py-10 text-center text-4xl font-bold ">
        To Do List
      </header>
      <main>
        <EnterTask /> {/* Add a new task */}
        <TaskList /> {/* List of tasks */}
      </main>
    </div>
  );
}

export default App;
