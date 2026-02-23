import { TaskState } from '../types.js';

export const VALID_STATES: TaskState[] = ['todo', 'in_progress', 'done'];

// Map friendly state aliases to canonical state names
const stateAliases: Record<string, TaskState> = {
  todo: 'todo',
  in_progress: 'in_progress',
  progress: 'in_progress',
  wip: 'in_progress',
  ip: 'in_progress',
  done: 'done',
};

// Resolve a state alias to its canonical name, or return null if invalid
export const resolveState = (input: string): TaskState | null => {
  return stateAliases[input.toLowerCase()] || null;
};
