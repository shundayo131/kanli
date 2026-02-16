export interface Task {
  id: string;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export type TaskState = 'todo' | 'in_progress' | 'done';

// Map friendly state aliases to canonical state names
const stateAliases: Record<string, TaskState> = {
  todo: 'todo',
  in_progress: 'in_progress',
  progress: 'in_progress',
  wip: 'in_progress',
  ip: 'in_progress',
  done: 'done',
};

export const VALID_STATES: TaskState[] = ['todo', 'in_progress', 'done'];

// Resolve a state alias to its canonical name, or return null if invalid
export const resolveState = (input: string): TaskState | null => {
  return stateAliases[input.toLowerCase()] || null;
};

export interface InitResult {
  success: boolean;
  message: string;
}

export interface CommandArgs {
  _: string[]; 
  desc?: string; 
  d?: string; 
  help?: boolean; 
  h?: boolean; 
  version?: boolean; 
  v?: boolean; 
  [key: string]: any; 
}