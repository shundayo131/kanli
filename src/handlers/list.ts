import { listTasks } from '../storage.js';
import { displayTaskList, displayError } from '../display.js';
import { CommandArgs, resolveState } from '../types.js';

export const handleListCommand = async (args: CommandArgs): Promise<void> => {
  const stateInput = args._[1];

  let state: string | null = null;
  if (stateInput) {
    state = resolveState(stateInput);
    if (!state) {
      displayError('Invalid state. Must be "todo", "in_progress" (or wip), or "done"');
      return;
    }
  }

  try {
    const tasks = await listTasks(state);
    displayTaskList(tasks, state);
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
}
