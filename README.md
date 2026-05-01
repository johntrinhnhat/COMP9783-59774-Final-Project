# Todo Application

A full-stack task management application built with React and Express.js.

## Quick Start

### Requirements

- Node.js v16+
- npm v8+

### Installation & Run

```bash
# Terminal 1 - Backend (Port 3000)
cd server
npm install
npm run dev

# Terminal 2 - Frontend (Port 5174)
cd client
npm install
npm run dev
```

Open http://localhost:5174

---

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS  
**Backend:** Express.js, Node.js  
**Tools:** Nodemon, CORS, Helmet, Morgan, UUID

---

## Project Structure

```
client/
  ├── src/
  │   ├── components/      (TodoForm, TodoList, TodoItem)
  │   ├── hooks/           (useTasks, useTaskFilter)
  │   ├── App.jsx          (Main component)
  │   └── constants.js     (Config & API URLs)
  └── package.json

server/
  ├── lib/
  │   ├── Crud.js          (CRUD operations)
  │   └── UUIDUtilsES6.js  (ID generation)
  ├── server.js            (Express app)
  └── package.json
```

---

## Features

✅ Create, Read, Update, Delete tasks  
✅ Filter (All, Active, Completed)  
✅ Sort (Newest, Oldest)  
✅ Real-time UI updates  
✅ Error handling  
✅ Responsive design

---

## API Endpoints

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| GET    | `/read`       | Get all tasks  |
| GET    | `/read/:id`   | Get task by ID |
| POST   | `/create`     | Create task    |
| PUT    | `/update/:id` | Update task    |
| DELETE | `/delete/:id` | Delete task    |

### Example

```bash
# Create task
curl -X POST http://localhost:3000/create \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","emoji":"🥛","completed":false}'
```

---

## Key Components

**Frontend:**

- **App.jsx** - Main component with handlers
- **useTasks** - Hook managing API calls & state
- **useTaskFilter** - Hook for filtering & sorting
- **TodoForm** - Add/Edit modal
- **TodoList** - Task list display
- **TodoItem** - Single task row

**Backend:**

- **server.js** - Express routes & middleware
- **Crud.js** - In-memory data store
- **UUIDUtilsES6.js** - UUID generator

---

## Development Commands

**Frontend:**

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
```

**Backend:**

```bash
npm run dev      # Start with auto-reload
npm start        # Start production
```

---

## Notes

- Data stored in memory (resets on restart)
- For production: Use a database (MongoDB, PostgreSQL)
- Frontend: Port 5174 | Backend: Port 3000

---

**Course:** COMP9783-59774 Final Project  
**License:** ISC
