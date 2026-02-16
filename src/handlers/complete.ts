import { displayError, displaySuccess, displayTask } from "../display.js";
import { completeTask } from "../storage.js";
import { CommandArgs } from "../types.js";

export const handleCompleteCommand = async (args: CommandArgs): Promise<void> => {
  const id = args._[1];
  
  if (!id) {
    displayError('Missing task ID');
    console.log('Usage: kanli complete <id>');
    return;
  }

  try {
    const task = await completeTask(id);
    displaySuccess(`Task marked as complete`);
    displayTask(task);
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
}