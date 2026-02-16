import { getTask } from "../storage.js";
import { displayError, displayTask } from "../display.js";
import { CommandArgs } from "../types.js";

export const handleShowCommand = async (args: CommandArgs): Promise<void> => {
  const id = args._[1];

  if (!id) {
    displayError('Missing task ID');
    console.log('Usage: kanli show <id>');
    return;
  }

  try {
    const task = await getTask(id);
    displayTask(task);
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
}
