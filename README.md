# Todo Application

A full-stack web application for task management with a modern React frontend and Express.js backend. Users can create, read, update, and delete tasks with filtering and sorting capabilities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Component Architecture](#component-architecture)
- [Development](#development)

---

## Features

✅ **Create Tasks** – Add new todos with title, emoji, and timestamp  
✅ **Read Tasks** – Fetch all tasks from the backend  
✅ **Update Tasks** – Edit existing tasks or toggle completion status  
✅ **Delete Tasks** – Remove tasks with confirmation dialog  
✅ **Filter Tasks** – View all, active, or completed tasks  
✅ **Sort Tasks** – Sort by newest or oldest first  
✅ **Task State Tracking** – Visual feedback for completed tasks  
✅ **Error Handling** – Graceful error messages and user feedback  
✅ **Responsive Design** – Mobile-friendly UI with Tailwind CSS

---

## Tech Stack

### Frontend

- **React 19** – UI library
- **Vite 8** – Fast development build tool
- **Tailwind CSS 4** – Utility-first CSS framework
- **React Router DOM 7** – Client-side routing
- **Lucide React 1** – Icon library
- **ESLint** – Code linting and quality

### Backend

- **Node.js** – JavaScript runtime
- **Express.js 5** – Web framework
- **CORS** – Cross-Origin Resource Sharing middleware
- **Helmet** – Security headers middleware
- **Morgan** – HTTP request logging
- **UUID** – Unique identifier generation
- **Nodemon** – Development auto-reload tool

---

## Project Structure

```
COMP9783-59774-Final-Project/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx   # Error handling wrapper
│   │   │   ├── Layout.jsx          # App layout container
│   │   │   ├── TodoForm.jsx        # Add/Edit task modal
│   │   │   ├── TodoItem.jsx        # Individual task component
│   │   │   └── TodoList.jsx        # Tasks list container
│   │   ├── App.jsx                 # Main app component & state management
│   │   ├── main.jsx                # React entry point
│   │   └── style.css               # Global styles
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   └── package.json                # Frontend dependencies
│
├── server/                          # Express.js backend
│   ├── lib/
│   │   ├── Crud.js                 # CRUD operations (in-memory storage)
│   │   └── UUIDUtilsES6.js         # UUID generation utility
│   ├── server.js                   # Express server setup & routes
│   └── package.json                # Backend dependencies
│
└── README.md                        # This file
```

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd COMP9783-59774-Final-Project
   ```

2. **Install server dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

---

## Usage

### Start Development Servers

**Terminal 1 – Start Backend (Port 3000):**

```bash
cd server
npm run dev
```

**Terminal 2 – Start Frontend (Port 5173):**

```bash
cd client
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

**Build frontend:**

```bash
cd client
npm run build
```

**Production server:**

```bash
cd server
npm start
```

---

## API Endpoints

All endpoints return JSON responses.

| Method   | Endpoint      | Description                 |
| -------- | ------------- | --------------------------- |
| `GET`    | `/read`       | Fetch all tasks             |
| `GET`    | `/read/:id`   | Fetch a specific task by ID |
| `POST`   | `/create`     | Create a new task           |
| `PUT`    | `/update/:id` | Update an existing task     |
| `DELETE` | `/delete/:id` | Delete a task               |

### Request/Response Examples

**Create Task:**

```json
POST /create
Content-Type: application/json

{
  "title": "Buy groceries",
  "emoji": "🛒",
  "completed": false
}

Response:
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Buy groceries",
  "emoji": "🛒",
  "time": "4/30/2026, 8:35:26 PM",
  "completed": false
}
```

**Update Task:**

```json
PUT /update/{id}
Content-Type: application/json

{
  "title": "Buy groceries",
  "emoji": "🛒",
  "completed": true
}
```

---

## Component Architecture

### App.jsx

**Root component** – manages global task state and API communication.

- Fetches tasks on mount
- Handles CRUD operations
- Manages filtering and sorting
- Provides handlers to child components

### TodoForm.jsx

**Modal dialog** – for creating or editing tasks.

- Accepts title and emoji input
- Validates non-empty titles
- Supports both "add" and "edit" modes
- Includes backdrop click to close

### TodoList.jsx

**Container component** – renders task items.

- Stateless: receives tasks array and callbacks
- Maps over tasks and renders TodoItem components

### TodoItem.jsx

**Presentational component** – renders individual task.

- Displays title, emoji, and timestamp
- Shows completion checkbox with visual feedback
- Includes edit and delete buttons
- Visual line-through effect for completed tasks

### Layout.jsx

**Page wrapper** – provides consistent UI structure.

### ErrorBoundary.jsx

**Error handling** – catches React errors and displays fallback UI.

---

## Backend Architecture

### server.js

Express app setup with:

- Security headers (Helmet)
- HTTP logging (Morgan)
- CORS support for frontend communication
- JSON body parsing
- Route definitions

### Crud.js

In-memory data store with CRUD operations:

- **createItem()** – Add new task with generated UUID
- **readItems()** – Fetch all tasks or single task by ID
- **updateItem()** – Modify existing task or create if not found
- **deleteItem()** – Remove task from array

### UUIDUtilsES6.js

UUID generation utility:

- Supports v1 (timestamp-based) and v4 (random) versions
- Input validation for version parameter

---

## Development

### Available Scripts

**Frontend:**

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

**Backend:**

```bash
npm run dev       # Start with Nodemon auto-reload
npm start         # Start production server
```

### Code Quality

- **ESLint** enforces consistent code style
- **Helmet** secures HTTP headers
- **Error handling** on API calls with user-friendly messages
- **React best practices** with hooks and component composition

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Notes

- **Data Persistence:** Currently uses in-memory storage (data resets on server restart)
- **Production Ready:** To persist data, integrate a database (MongoDB, PostgreSQL, etc.)
- **Environment Variables:** Consider using `.env` files for API endpoints in production
- **Port Configuration:** Backend runs on port 3000, frontend on 5173 (Vite default)

---

## License

ISC License

---

**Last Updated:** April 2026  
**Developed for:** COMP9783-59774 Final Project
