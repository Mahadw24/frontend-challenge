import React from 'react';
import { Task } from '../../recoil/todoState';
import TaskItem from '../TaskItem/index';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useAutoScroll } from '../../hooks/useAutoScroll';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const listRef = useAutoScroll<HTMLUListElement>(tasks.length, 6);

  return (
    <ul
      ref={listRef}
      className="space-y-2 px-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
    >
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.li
            key="no-tasks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-center py-4"
          >
            No tasks
          </motion.li>
        ) : (
          tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TaskItem task={task} />
            </motion.li>
          ))
        )}
      </AnimatePresence>

      <Toaster />
    </ul>
  );
};

export default TaskList;