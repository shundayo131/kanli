import chalk from 'chalk';

// Show help message
export const showHelp = (): void => {
  console.log(`
${chalk.bold('Kanli')} — Simple task management for your projects

${chalk.yellow.bold('USAGE:')}
  kanli <command> [options]

${chalk.yellow.bold('COMMANDS:')}
  ${chalk.cyan('init')}                    Initialize kanban board in current directory
  ${chalk.cyan('add')} <title>             Add a new task
    --desc, -d            Task description
  ${chalk.cyan('list')} [state]            List all tasks (alias: ${chalk.dim('ls')})
                          state: todo, in_progress (wip), done
  ${chalk.cyan('show')} <id>               Show task details
  ${chalk.cyan('move')} <id> <state>       Move a task to a different state (alias: ${chalk.dim('mv')})
  ${chalk.cyan('complete')} <id>           Mark a task as complete (alias: ${chalk.dim('done')})
  ${chalk.cyan('delete')} <id>             Delete a task (alias: ${chalk.dim('rm')})

${chalk.yellow.bold('EXAMPLES:')}
  ${chalk.dim('$')} kanli init
  ${chalk.dim('$')} kanli add "Implement login form" --desc "Create UI and validation"
  ${chalk.dim('$')} kanli list
  ${chalk.dim('$')} kanli ls todo
  ${chalk.dim('$')} kanli show abc123
  ${chalk.dim('$')} kanli mv abc123 wip
  ${chalk.dim('$')} kanli done xyz789
  ${chalk.dim('$')} kanli rm xyz789`);
}
