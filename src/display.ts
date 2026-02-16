import chalk from 'chalk';
import { Task, TaskState } from './types.js';

// Color mapping for different states
const stateColors = {
  todo: chalk.yellow,
  in_progress: chalk.blue,
  done: chalk.green
};

// Format a single task 
const formatTask = (task: Task): string => {
  const stateColor = stateColors[task.state as keyof typeof stateColors] || chalk.white;
  return `${chalk.bold(task.id)} ${stateColor(`[${task.state}]`)} ${task.title}`;
}

// Display a single task with details
export const displayTask = (task: Task): void => {
  console.log(formatTask(task));
  
  if (task.description) {
    console.log(`  Description: ${chalk.gray(task.description)}`);
  }
  
  console.log(`  ${chalk.dim(`Created: ${new Date(task.created_at).toLocaleString()}`)}`);
  
  if (task.created_at !== task.updated_at) {
    console.log(`  ${chalk.dim(`Updated: ${new Date(task.updated_at).toLocaleString()}`)}`);
  }
  
  console.log('');
}

// Display tasks for a single section
const displaySection = (tasks: Task[]): void => {
  if (tasks.length === 0) {
    console.log(`  ${chalk.dim('No tasks')}`);
  } else {
    tasks.forEach(task => {
      console.log(`  ${chalk.bold(task.id)}  ${task.title}`);
      if (task.description) {
        console.log(`         ${chalk.gray(task.description)}`);
      }
    });
  }
}

// Display a list of tasks
export const displayTaskList = (tasks: Task[], state: string | null = null): void => {
  // Display tasks for a specific state filter
  if (state) {
    const stateColor = stateColors[state as keyof typeof stateColors] || chalk.white;
    console.log(`\n${stateColor.bold(`Tasks in ${state} state:`)}`);

    if (tasks.length === 0) {
      console.log(`  ${chalk.dim('No tasks')}`);
    } else {
      tasks.forEach(task => {
        console.log(`  ${chalk.bold(task.id)}  ${task.title}`);
        if (task.description) {
          console.log(`         ${chalk.gray(task.description)}`);
        }
      });
    }
    console.log('');
    return;
  }

  // Board view — always show all three columns
  const todoTasks = tasks.filter(task => task.state === 'todo');
  const inProgressTasks = tasks.filter(task => task.state === 'in_progress');
  const doneTasks = tasks.filter(task => task.state === 'done');

  console.log(`\n${chalk.yellow.bold(`📋 TODO (${todoTasks.length})`)}`);
  displaySection(todoTasks);

  console.log(`\n${chalk.blue.bold(`🔄 IN PROGRESS (${inProgressTasks.length})`)}`);
  displaySection(inProgressTasks);

  console.log(`\n${chalk.green.bold(`✅ DONE (${doneTasks.length})`)}`);
  displaySection(doneTasks);

  // Summary footer
  const total = tasks.length;
  console.log(`\n${chalk.dim(`${total} task${total !== 1 ? 's' : ''}: ${todoTasks.length} todo, ${inProgressTasks.length} in progress, ${doneTasks.length} done`)}`);
}

// Display success message
export const displaySuccess = (message: string): void => {
  console.log(`${chalk.green('✓')} ${message}`);
}

// Display error message
export const displayError = (message: string | {error: string}): void => {
  const errorMessage = typeof message === 'string' ? message : message.error;
  console.error(`${chalk.red('✗')} ${errorMessage}`);
}

// Display initialization instructions
export const displayInitInstructions = (): void => {
  console.log(`\nTo get started with the kanban board, run:`);
  console.log(`  ${chalk.cyan('kanli init')}`);
  console.log(`\nThis will set up a kanban board in your current directory.`);
}