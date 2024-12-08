import React from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { useTodoList } from '../hooks/useTodoList';
import { useFilter } from '../hooks/useFilter';
import SearchInput from '../components/Search';

const App = () => {
  const { todoList } = useTodoList();
  const {
    filteredTasks,
    searchTerm,
    setSearchTerm,
    filterCompleted,
    setFilterCompleted,
  } = useFilter(todoList);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-3xl rounded-lg p-6 bg-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Todo List
          </h1>

          <SearchInput value={searchTerm} onDebouncedChange={setSearchTerm} />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Filter:</label>
          <select
            value={filterCompleted}
            onChange={(e) =>
              setFilterCompleted(
                e.target.value as 'all' | 'completed' | 'incomplete'
              )
            }
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <TaskList tasks={filteredTasks} />

        <TaskInput />
      </div>
    </div>
  );
};

export default App;
