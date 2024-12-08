import { useRecoilState } from 'recoil';
import { todoListState, Task } from '../recoil/todoState';
import { useEffect } from 'react';

export const useTodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodoList(parsedTodos);
        }
      } catch (error) {
        console.error('Error parsing todoList from localStorage:', error);
      }
    }
  }, [setTodoList]);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } else {
      localStorage.removeItem('todoList');
    }
  }, [todoList]);

  const addTask = (newTask: Task) => {
    setTodoList((prev) => [...prev, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTodoList((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTodoList((prev) => prev.filter((task) => task.id !== taskId));
  };

  return { todoList, addTask, updateTask, deleteTask };
};
