import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { useMutation, useQueryClient } from "react-query";

// POST to /api/items.json
async function postTodo({ title, text }) {
  const todo = {
    title,
    task: text,
  };
  await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
}

function EnterTask() {
  // For saving the modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Access the query client in app
  const queryClient = useQueryClient();
  // Mutate the todo list with the postTodo function
  // invalidate the query client to refresh the list
  // with error handling if the post fails
  const createTodo = useMutation(postTodo, {
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries("todolist");
    },
    onError: () => {
      alert("unable to create todo");
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // call the mutation function with the form data
    createTodo.mutate(data);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="-mt-6 flex flex-row justify-center gap-6">
      <Button onClick={openModal}>Add Todo</Button>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={onSubmit}
        >
          <Dialog.Title>Enter Task</Dialog.Title>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="New Title"
            className="border-1 h-9 w-full rounded-md border-solid border-indigo-200 px-2 shadow-lg duration-100 ease-linear focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-200"
          />
          <textarea
            id="text"
            name="text"
            placeholder="Description"
            className="border-1 h-full w-full resize-none rounded-md border-solid p-2 shadow-lg duration-100 ease-linear focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-200"
          />
          {/* disable button when create todo is posting */}
          <Button type="submit" disabled={createTodo.isLoading}>
            Add Task
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default EnterTask;
