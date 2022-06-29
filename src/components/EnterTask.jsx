import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

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

export default EnterTask;
