import { displaySuccess, displayError } from '../display.js';
import { init } from '../storage.js';

export const handleInitCommand = async (): Promise<void> => {
  try {
    const result = await init();
  
    if (result.success) {
      displaySuccess(result.message);
      console.log('\nYou can now add tasks with:');
      console.log('  kanli add "Task title" --desc "Task description"');
    } else {
      displayError(result.message);
    }
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
}