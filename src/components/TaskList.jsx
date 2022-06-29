import TodoItems from "./TodoItems";

function TaskList({ todolist, onDeleteTask, onEditTask }) {
  return (
    <div className="flex flex-row flex-wrap mt-5 mx-4 gap-5">
      {todolist.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-row justify-center gap-2 p-4 pb-8 w-96 relative shadow-md bg-slate-200 rounded-md "
        >
          <TodoItems
            key={todo.id}
            todo={todo}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
