import { atom } from 'recoil';

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export const todoListState = atom<Task[]>({
  key: 'todoListState',
  default: [],
});
