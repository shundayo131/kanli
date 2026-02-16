import { displayError, displaySuccess } from "../display.js";
import { deleteTask } from "../storage.js";
import { CommandArgs } from '../types.js';

export const handleDeleteCommand = async (args: CommandArgs): Promise<void> => {
  const id = args._[1];
  
  if (!id) {
    displayError('Missing task ID');
    console.log('Usage: kanli delete <id>');
    return;
  }

  try {
    await deleteTask(id);
    displaySuccess('Task deleted successfully');
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }  
}