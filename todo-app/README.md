# Todo List Application

A modern, feature-rich todo list application with local storage persistence, drag-and-drop functionality, and beautiful UI.

## Features

✅ **Add/Edit/Delete Todos** - Full CRUD operations  
✅ **Local Storage** - Todos persist across sessions  
✅ **Categories** - Organize todos by project/category  
✅ **Priority Levels** - High, Medium, Low priority  
✅ **Due Dates** - Set and track deadlines  
✅ **Drag & Drop** - Reorder todos easily  
✅ **Search & Filter** - Find todos by keyword or status  
✅ **Mark Complete** - Check off finished tasks  
✅ **Statistics** - Track progress with analytics  
✅ **Dark Mode** - Eye-friendly dark theme  
✅ **Keyboard Shortcuts** - Quick actions with hotkeys  
✅ **Responsive Design** - Works on all devices  
✅ **Export/Import** - Backup and restore data  

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Icons
- React Beautiful DND (drag-and-drop)
- Vite
- LocalStorage API

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd todo-app/frontend
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
todo-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── CategoryBar.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── hooks/
│   │   │   ├── useTodos.js
│   │   │   ├── useLocalStorage.js
│   │   │   └── useKeyboardShortcuts.js
│   │   ├── utils/
│   │   │   ├── storage.js
│   │   │   └── formatters.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── README.md
└── docker-compose.yml
```

## Usage

### Add a Todo
1. Type in the input field
2. (Optional) Select a category
3. (Optional) Set priority and due date
4. Press Enter or click Add button

### Edit a Todo
1. Click the edit icon on a todo
2. Modify the text
3. Press Enter or click Save

### Delete a Todo
1. Click the trash icon
2. Confirm deletion

### Mark as Complete
1. Click the checkbox next to a todo
2. Todo will be struck through

### Filter Todos
- **By Status**: All, Active, Completed
- **By Priority**: High, Medium, Low
- **By Category**: Select from dropdown
- **By Search**: Type keywords in search bar

### Organize with Drag & Drop
1. Click and hold a todo
2. Drag to new position
3. Drop to reorder

### View Statistics
- Total todos count
- Completed percentage
- Pending todos
- High priority count

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | Focus on new todo input |
| `Ctrl/Cmd + /` | Focus on search |
| `Ctrl/Cmd + E` | Export todos |
| `Ctrl/Cmd + I` | Import todos |
| `Escape` | Clear selection |

## Storage Structure

```json
{
  "todos": [
    {
      "id": "uuid",
      "text": "Todo text",
      "completed": false,
      "priority": "high",
      "category": "work",
      "dueDate": "2024-12-31",
      "createdAt": "2024-01-01T10:00:00Z",
      "completedAt": null
    }
  ],
  "categories": [
    {
      "id": "uuid",
      "name": "Work",
      "color": "blue",
      "icon": "briefcase"
    }
  ],
  "settings": {
    "theme": "dark",
    "sortBy": "dueDate",
    "filterBy": "all"
  }
}
```

## Features Detailed

### Todo Management
- Create, read, update, delete todos
- Set priority (High, Medium, Low)
- Assign to categories
- Set due dates with date picker
- Add descriptions (optional)
- Track creation and completion times

### Categories
- Create custom categories
- Assign colors and icons
- Filter by category
- Edit category names
- Delete categories

### Search & Filter
- Real-time search by text
- Filter by status (All, Active, Completed)
- Filter by priority level
- Filter by category
- Combine multiple filters

### Sorting
- By due date (earliest first)
- By priority (high to low)
- By creation date (newest first)
- By category
- Drag-and-drop custom order

### Statistics Dashboard
- Total todos
- Completed todos
- Completion percentage
- High priority count
- Due today count
- Overdue count
- Todos by category

### Import/Export
- Export todos as JSON
- Import from JSON file
- Backup all data
- Restore from backup

### Dark Mode
- Toggle dark/light theme
- Persistent theme preference
- Eye-friendly colors

## Local Storage

All data is stored in browser's LocalStorage:
- `todos` - Array of all todos
- `categories` - Array of categories
- `settings` - User preferences

Storage size: ~5MB per domain (varies by browser)

## Browser Support

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge 12+
- Opera 10.5+
- IE 8+

## Performance

- Optimized React re-renders
- Efficient local storage updates
- Lazy component loading
- Image optimization
- Code splitting with Vite

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus indicators

## Data Security

- Data stored locally (not sent to servers)
- No authentication required
- Privacy-focused design
- Can delete all data anytime

## Keyboard Shortcuts

```
Ctrl/Cmd + N     - New todo
Ctrl/Cmd + /     - Search
Ctrl/Cmd + E     - Export
Ctrl/Cmd + I     - Import
Esc              - Clear focus
Enter            - Save todo
Delete/Backspace - Delete selected
```

## Tips & Tricks

1. **Batch Operations**: Select multiple todos and bulk edit
2. **Templates**: Create recurring todo templates
3. **Smart Sort**: Auto-sort by due date or priority
4. **Color Coding**: Use colors for quick category identification
5. **Quick Add**: Use keyboard shortcut for fast todo creation

## Troubleshooting

### Todos not saving?
- Check browser's local storage settings
- Ensure private/incognito mode is disabled
- Clear browser cache and try again

### Storage quota exceeded?
- Export and backup your todos
- Delete completed todos
- Clear old/archived todos

### Lost data?
- Check browser DevTools > Application > LocalStorage
- Look for recent browser updates
- Check if data syncing is disabled

## Future Enhancements

- Cloud sync (Firebase/Supabase)
- Collaborative todos
- Mobile app (React Native)
- Voice input
- AI-powered suggestions
- Recurring todos
- Subtasks
- Time tracking
- Notifications
- Browser sync

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file

## Support

For issues or suggestions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Create an issue on GitHub

---

**Created with ❤️ using React, Tailwind CSS, and LocalStorage API**
