// JSON file storage operations 

import fs from 'fs/promises';
import path from 'path';
import { Task, TaskState, InitResult } from './types.js';

// Configuration 
const DATA_DIR = '.kanban';
const TASKS_FILE = 'tasks.json'

// Generate a random ID for task 
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 8);
}

// Initalize storage 
export const init = async (): Promise<InitResult> => {
  try {
    // Check if directory exists, create if not
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR);
    }
    
    // Check if tasks file exists. create if not.
    const tasksPath = path.join(DATA_DIR, TASKS_FILE);
    try {
      await fs.access(tasksPath);
    } catch {
      await fs.writeFile(tasksPath, JSON.stringify([]));
    }

    return {
      success: true,
      message: 'kanban board initialized successfully.'
    };
  
  } catch (e) {
    return { 
      success: false, 
      message: `Failed to initialize kanban board: ${e instanceof Error? e.message : String(e)}`
    }; 
  }
}

// Check if kanban is initialized
export const isInitialized = async (): Promise<boolean> => {
  try {
    await fs.access(DATA_DIR);
    await fs.access(path.join(DATA_DIR, TASKS_FILE));
    return true;
  } catch {
    return false; 
  }
}

// Helper function to check if kanban is initialized
const ensureInitialized = async (): Promise<void> => {
  try {
    await fs.access(DATA_DIR);
    await fs.access(path.join(DATA_DIR, TASKS_FILE));
  } catch {
    throw new Error('Kanban board is not initialized. Run "kanli init" first.');
  }
}

// Read tasks in file 
const readTasks = async (): Promise<Task[]> => {
  try {
    const tasksPath = path.join(DATA_DIR, TASKS_FILE);
    const data = await fs.readFile(tasksPath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    throw new Error(`Could not read tasks: ${e instanceof Error ? e.message : String(e)}`);
  }
}

// Write tasks to file 
const writeTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const tasksPath = path.join(DATA_DIR, TASKS_FILE);
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  } catch (e) {
    throw new Error(`Could not write tasks: ${e instanceof Error ? e.message : String(e)}`);
  }
}

// Add task to task table 
export const addTask = async (title: string, description: string): Promise<Task> => {
  try {
    // Check if kanban is initalized 
    await ensureInitialized();
  
    const tasks = await readTasks();
  
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      state: 'todo',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  
    tasks.push(newTask);
    await writeTasks(tasks);

    return newTask;
  } catch (e) {
    throw new Error(`Could not add task: ${e instanceof Error ? e.message : String(e)}`);
  }
}

// List tasks per state, optionally with state 
export const listTasks = async (state: string | null = null): Promise<Task[]> => {
  try {
    // check if kanban is initialized
    await ensureInitialized();

    // Get all tasks
    const tasks = await readTasks();

    // Filter tasks by state 
    if (state) {
      return tasks.filter(task => task.state === state);
    }

    return tasks;
  } catch (e) {
    throw new Error(`Could not list tasks: ${e instanceof Error ? e.message : String(e)}`);
  } 
}

// Move task state 
export const moveTask = async (id: string, state: string): Promise<Task> => {
  try {
    // Check if kanban is initalized 
    await ensureInitialized();
    
    // if state is invalid, return error 
    if (!['todo', 'in_progress', 'done'].includes(state)) {
      throw new Error('Invalid state. Must be "todo", "in_progress", or "done"');
    }
    
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
  
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
  
    tasks[taskIndex].state = state;
    tasks[taskIndex].updated_at = new Date().toISOString(); 
  
    // Return the task 
    await writeTasks(tasks);

    return tasks[taskIndex];
  } catch (e) {
    throw new Error(`Could not move task: ${e instanceof Error ? e.message : String(e)}`);
  }
}

// Get a single task by ID
export const getTask = async (id: string): Promise<Task> => {
  await ensureInitialized();
  const tasks = await readTasks();
  const task = tasks.find(task => task.id === id);
  if (!task) {
    throw new Error(`Task with ID ${id} not found`);
  }
  return task;
}

export const completeTask = (id: string): Promise<Task> => {
  return moveTask(id, 'done');
}

export const deleteTask = async (id: string): Promise<Task> => {
  try {
    // Check if kanban is initialized 
    await ensureInitialized();

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);

    await writeTasks(tasks);

    return deletedTask;
  } catch (e) {
    throw new Error(`Could not delete task: ${e instanceof Error ? e.message : String(e)}`);
  }
}