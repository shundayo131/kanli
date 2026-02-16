import { moveTask } from "../storage.js";
import { displayError, displaySuccess, displayTask } from "../display.js";
import { CommandArgs } from "../types.js";
import { resolveState } from "../util/stateUtils.js";

export const handleMoveCommand = async (args: CommandArgs): Promise<void> => {
  const id = args._[1];
  const stateInput = args._[2];

  if (!id) {
    displayError('Missing task ID');
    console.log('Usage: kanli move <id> <state>');
    return;
  }

  if (!stateInput) {
    displayError('Missing state');
    console.log('Usage: kanli move <id> <state>');
    return;
  }

  const state = resolveState(stateInput);
  if (!state) {
    displayError('Invalid state. Must be "todo", "in_progress" (or wip), or "done"');
    return;
  }

  try {
    const task = await moveTask(id, state);
    displaySuccess(`Task moved to ${state}`);
    displayTask(task);
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
}
