import { Task } from '../recoil/todoState';
import { useState } from 'react';

export const useFilter = (tasks: Task[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<
    'all' | 'completed' | 'incomplete'
  >('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterCompleted === 'all' ||
      (filterCompleted === 'completed' && task.isCompleted) ||
      (filterCompleted === 'incomplete' && !task.isCompleted);

    return matchesSearchTerm && matchesFilter;
  });

  return {
    filteredTasks,
    searchTerm,
    setSearchTerm,
    filterCompleted,
    setFilterCompleted,
  };
};
