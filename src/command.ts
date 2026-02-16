// command handling logic
import minimist from 'minimist'
import {
  handleAddCommand,
  handleInitCommand,
  handleListCommand,
  handleMoveCommand,
  handleCompleteCommand,
  handleDeleteCommand,
  handleShowCommand,
} from './handlers/index.js'
import { isInitialized } from './storage.js';
import { showHelp } from './util/showHelp.js';
import { showVersion } from './util/version.js';
import { displayError, displayInitInstructions } from './display.js';
import { CommandArgs } from './types.js';

// Parse command line arguments
const parseArg = (): CommandArgs => {
  return minimist(process.argv.slice(2), {
    boolean: ['help', 'version'],
    string: ['desc'],
    alias: {
      d: 'desc',
      h: 'help',
      v: 'version',
    }
  }) as CommandArgs;
}

// Process command
const processCommand = async (args: CommandArgs): Promise<void> => {
  const command = args._[0];

  // Handle help and version flags
  if (args.help) {
    showHelp();
    return;
  }

  if (args.version) {
    const version = await showVersion();
    console.log(`Kanli version: ${version}`);
    return;
  }

  // Return error message if kanban is not initialized AND the command is not init or undefined
  const initialized = await isInitialized();
  if (!initialized && command !== 'init' && command !== undefined) {
    displayError('Kanban board has not been initialized.');
    displayInitInstructions();
    return;
  }

  // Process specific commands
  switch (command) {
    case 'init':
      await handleInitCommand();
      break;

    case 'add':
    case 'a':
      await handleAddCommand(args);
      break;

    case 'list':
    case 'ls':
      await handleListCommand(args);
      break;

    case 'show':
      await handleShowCommand(args);
      break;

    case 'move':
    case 'mv':
      await handleMoveCommand(args);
      break;

    case 'complete':
    case 'done':
      await handleCompleteCommand(args);
      break;

    case 'delete':
    case 'rm':
      await handleDeleteCommand(args);
      break;

    case undefined:
      if (initialized) {
        await handleListCommand(args);
      } else {
        showHelp();
        displayInitInstructions();
      }
      break;

    default:
      displayError(`Unknown command: ${command}`);
      showHelp();
      break;
  }
}

// Main function
const main = async (): Promise<void> => {
  try {
    const args = parseArg();
    await processCommand(args);
  } catch (e) {
    displayError(e instanceof Error ? e.message : String(e));
  }
};

// Run the application
main();
