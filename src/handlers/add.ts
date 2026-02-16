import { addTask } from '../storage.js';
import { displayTask, displayError, displaySuccess } from '../display.js';
import { CommandArgs } from '../types.js';

export const handleAddCommand = async (args: CommandArgs): Promise<void> => {
  const title = args._[1];
  const description = args.desc || '';
  
  if (!title) {
    displayError('Missing task title')
    console.log('Usage: kanli add "Task title" [--desc "Task description"]');
    return;
  }

  try {
    const task = await addTask(title, description); 
    displaySuccess('Task added successfully');
    displayTask(task);
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
}