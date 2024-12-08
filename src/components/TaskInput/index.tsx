import React, { useState } from 'react';
import { useTodoList } from '../../hooks/useTodoList';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const TaskInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTask, todoList } = useTodoList();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      return toast.error('Task cannot be empty!');
    }

    if (trimmedInput.length > 50) {
      return toast.error('Task is too long!');
    }

    if (
      todoList.some(
        (task) => task.text.toLowerCase() === trimmedInput.toLowerCase()
      )
    ) {
      return toast.error('Task already exists!');
    }

    addTask({
      id: Date.now().toString(),
      text: trimmedInput,
      isCompleted: false,
    });
    setInputValue('');
    toast.success('Task added!');
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="relative flex items-center sm:flex-row gap-4"
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-300"></div>

      <FontAwesomeIcon icon={faCirclePlus} size="xl" color="#7328F7" />

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Memorize the dictionary"
        className="rounded-md px-4 py-4 w-full flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
      />

      <button
        type="submit"
        className="bg-[#7329F6] text-white sm:px-4 sm:py-2 px-2 py-1   rounded-md font-medium hover:bg-[#591FCC] transition-colors focus:outline-none focus:ring-0"
      >
        Add Item
      </button>

      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-300"></div>
    </form>
  );
};

export default TaskInput;
