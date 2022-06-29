import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./App.css";

function EnterTask({ onAddTask }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newToD0 = {
      id: new Date().getTime(),
      title: data.title,
      task: data.text,
    };
    onAddTask(newToD0);
    e.target.reset();
    closeModal();
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="flex flex-row justify-center gap-6 -mt-6">
      <Button onClick={openModal}>Add Todo</Button>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <form
          className="flex flex-col gap-4 justify-center items-center"
          onSubmit={onSubmit}
        >
          <Dialog.Title>Enter Task</Dialog.Title>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="New Title"
            className="px-2 w-full h-9 border-solid border-indigo-200 border-1 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
          />
          <textarea
            id="text"
            name="text"
            placeholder="Description"
            className="resize-none p-2 w-full h-full border-solid border-1 shadow-lg ease-linear duration-100 focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-transparent rounded-md"
          />
          <Button type="submit">Add Task</Button>
        </form>
      </Modal>
    </div>
  );
}

function Modal({ children, modalIsOpen, closeModal }) {
  return (
    <Transition appear show={modalIsOpen} as={Fragment}>
      <Dialog onClose={closeModal} className="relative z-10">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-md"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-8"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="py-4 px-12 w-full max-w-sm bg-slate-300 rounded-md">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

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
