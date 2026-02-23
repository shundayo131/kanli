### Kanli

Kanli (管理) means 'manage' in Japanese. This is a simple command-line Kanban board to manage your programming tasks.

### Version

v0.1.1

### Tech Stack

- TypeScript
- Node.js (ES Modules)
- minimist (command-line argument parsing)
- Chalk (terminal styling)

### Features

- Initialize a project-specific Kanban board with local JSON storage (`.kanban/tasks.json`)
- Create tasks with titles and optional descriptions
- View tasks organized by state (Todo, In Progress, Done) with color-coded columns
- Show detailed task information including timestamps
- Move tasks between states with flexible state aliases (`wip`, `progress`, `ip` for `in_progress`)
- Mark tasks as complete
- Delete tasks
- Short command aliases for faster workflow (`a`, `ls`, `mv`, `done`, `rm`)
- Running `kanli` with no command displays the board automatically

### What's new in v0.1.1

- Codebase migrated from JavaScript to TypeScript with strict type safety
- Modularized architecture with dedicated handlers for each command
- Added `show` command for detailed task view with formatted timestamps
- Added short command aliases (`a`, `ls`, `mv`, `done`, `rm`)
- Improved error handling and user-friendly error messages
- Color-coded Kanban board display with state icons

### Feature backlog

- Add `edit` command to allow editing task title and description
- Update `list` command with table view
- Add unit and integration tests with Jest

### Usage

```bash
# Initialize a kanban board in your project
kanli init

# Add tasks
kanli add "Task title"
kanli add "Task title" --desc "Optional description"
kanli a "Quick add"

# List tasks
kanli list              # Show all tasks
kanli ls todo           # Filter by state
kanli ls in_progress    # or: wip, progress, ip
kanli ls done

# Show task details
kanli show <id>

# Move tasks between states
kanli move <id> in_progress
kanli mv <id> wip

# Mark task as complete
kanli complete <id>
kanli done <id>

# Delete a task
kanli delete <id>
kanli rm <id>

# Help & version
kanli --help    # or: -h
kanli --version # or: -v
```

### Project Structure

```
src/
├── index.ts            # CLI entry point
├── command.ts          # Command routing & argument parsing
├── storage.ts          # JSON file operations & task CRUD
├── display.ts          # Terminal UI & formatting
├── types.ts            # TypeScript interfaces
├── handlers/           # Modular command handlers
│   ├── init.ts
│   ├── add.ts
│   ├── list.ts
│   ├── show.ts
│   ├── move.ts
│   ├── complete.ts
│   └── delete.ts
└── util/               # Shared utilities
    ├── showHelp.ts
    ├── stateUtils.ts
    └── version.ts
```

### License

MIT