import React, { useState } from 'react';
import { Task } from '../../recoil/todoState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ConfirmDialog from '../Dialog/ConfirmDialog';
import toast from 'react-hot-toast';
import { useTodoList } from '../../hooks/useTodoList';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTodoList();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const toggleCompletion = () => {
    updateTask(task.id, { isCompleted: !task.isCompleted });
  };

  const handleDeleteClick = () => {
    if (!task.isCompleted) {
      toast.error('You cannot delete an incomplete task!');
      return;
    }
    setShowConfirmDialog(true); 
  };

  const confirmDelete = () => {
    setShowConfirmDialog(false);
    setIsDeleting(true);
  };

  const handleAnimationComplete = () => {
    if (isDeleting) {
      deleteTask(task.id);
      toast.success('Task deleted successfully!');
    }
  };

  const saveEdit = () => {
    const trimmedValue = editValue.trim();
    if (!trimmedValue) {
      toast.error('Task cannot be empty!');
      return;
    }

    updateTask(task.id, { text: trimmedValue });
    setIsEditing(false);
    toast.success('Task updated successfully!');
  };

  const cancelEdit = () => {
    setEditValue(task.text);
    setIsEditing(false); 
  };

  return (
    <>
      <motion.li
        layout
        className="relative"
        initial={{ opacity: 1, x: 0 }}
        animate={isDeleting ? { opacity: 0, x: 200 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className="absolute inset-x-0 top-0 h-[1px] left-9 bg-gray-300"></div>
        <div className="flex items-center justify-between py-4 rounded-md">
          <div className="flex items-center gap-3 w-11/12">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={toggleCompletion}
              className="w-6 h-6 bg-white shrink-0 rounded-full cursor-pointer appearance-none checked:bg-[#7328F7] outline-none ring-2 ring-[#7328F7]"
            />
            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 border-b border-gray-300 focus:outline-none bg-transparent text-gray-800"
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit();
                  if (e.key === 'Escape') cancelEdit();
                }}
              />
            ) : (
              <span
                onClick={() => setIsEditing(true)} // Enable edit mode
                className={`truncate cursor-pointer ${
                  task.isCompleted
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
              >
                {task.text}
              </span>
            )}
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={handleDeleteClick}
            size="sm"
            className="cursor-pointer text-[#7328F7]"
          />
        </div>
      </motion.li>
      <div className="absolute inset-x-0 bottom-0 h-[1px] left-9 bg-gray-300"></div>

      <ConfirmDialog
        message="Are you sure you want to delete this task?"
        isOpen={showConfirmDialog}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </>
  );
};

export default TaskItem;
