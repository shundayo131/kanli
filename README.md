### Kanli

Kanli (管理) means 'manage' in Japanese. This is a simple command line Kanban board to manage your programming tasks. 

### Version 

v0.1.1

### Tech Stack 

- TypeScript  
- Node.js (ES Modules)
- minimist (command-line argument parsing)
- Chalk (terminal output)

### Features 

- Initialize a project-specific Kanban board
- Create tasks with titles and optional descriptions
- View tasks organized by state (Todo, In Progress, Done)
- Move tasks between states
- Mark tasks as complete
- Delete tasks
- Local JSON storage (.kanban/tasks.json)

### Feature backlog 

- Add `edit` command to allow editing task title and description
- Update `list` command to show description with a table view. 
- Implement detailed task view with kanban `show <id>` command
- Add unit and integration tests with Jest

### What's new in version 0.1.1

- Codebase migrated from JavaScript to TypeScript
- Improved type safety with TypeScript interfaces
- Better error handling

### Usage

```bash
# After installation, use one of these patterns depending on how you installed:
# - If installed globally: kanban <command>
# - If using npx: npx kanban-cli <command>
# - If installed locally: npx kanban <command>

# Initialize
kanban init

# Add tasks
kanban add "Task title" --desc "Optional description"

# List tasks
kanban list
kanban list todo
kanban list in_progress
kanban list done

# Update tasks
kanban move <id> in_progress
kanban complete <id>
kanban delete <id>

# Help 
kanban -help
kanban -h

# Version
kanban --version
kanban -v

```

### License 

MIT