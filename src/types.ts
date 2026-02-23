export interface Task {
  id: string;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export type TaskState = 'todo' | 'in_progress' | 'done';

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