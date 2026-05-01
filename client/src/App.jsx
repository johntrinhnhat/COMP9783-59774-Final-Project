import { useState, useEffect } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

import TodoList from "./components/TodoList.jsx";
import TodoForm from "./components/TodoForm.jsx";
/**
 * Owns the tasks state and exposes handlers to children.
 * Fetches data from backend API on mount.
 */
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch tasks from backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/read");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const apiRequest = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!res.ok) throw new Error(`API request failed: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const showError = (message) => {
    alert(message);
  };

  // Filter and sort tasks based on current filter and sort order
  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;

    // Apply filter
    switch (filter) {
      case "active":
        filtered = tasks.filter((task) => !task.completed);
        break;
      case "completed":
        filtered = tasks.filter((task) => task.completed);
        break;
      default:
        filtered = tasks;
    }

    // Apply sort
    return filtered.sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);

      if (sortOrder === "newest") {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });
  };

  // Get task counts for filter options
  const getTaskCounts = () => {
    const total = tasks.length;
    const active = tasks.filter((task) => !task.completed).length;
    const completed = tasks.filter((task) => task.completed).length;
    return { total, active, completed };
  };

  // Toggle task completion — sync with backend
  const handleToggle = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updatedTask = { ...task, completed: !task.completed };
      await apiRequest(`http://localhost:3000/update/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
      });

      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

      // Auto-adjust filter if current filter becomes empty
      setTimeout(() => {
        const newCounts = getTaskCounts();
        if (
          filter === "active" &&
          newCounts.active === 0 &&
          newCounts.completed > 0
        ) {
          setFilter("all");
        } else if (
          filter === "completed" &&
          newCounts.completed === 0 &&
          newCounts.active > 0
        ) {
          setFilter("all");
        }
      }, 0);
    } catch (error) {
      showError("Không thể cập nhật trạng thái task. Vui lòng thử lại.");
    }
  };

  // Delete task — remove from backend and UI
  const handleDelete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );
    if (!confirmed) return;

    try {
      await apiRequest(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
      });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      showError("Không thể xóa task. Vui lòng thử lại.");
    }
  };

  // Add new task — create in backend and add to UI
  const handleAdd = async ({ title, emoji }) => {
    try {
      const newTask = {
        title,
        emoji,
        time: new Date().toLocaleString(),
        completed: false,
      };

      const created = await apiRequest("http://localhost:3000/create", {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      setTasks((prev) => [created, ...prev]);
      setIsFormOpen(false);
    } catch (error) {
      showError("Không thể thêm task. Vui lòng thử lại.");
    }
  };

  // Open edit form with task data
  const handleEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingTask(task);
      setIsFormOpen(true);
    }
  };

  // Submit edit — update backend and UI
  const handleEditSubmit = async ({ title, emoji }) => {
    try {
      const updatedTask = { ...editingTask, title, emoji };
      await apiRequest(`http://localhost:3000/update/${editingTask.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? updatedTask : t)),
      );
      setEditingTask(null);
      setIsFormOpen(false);
    } catch (error) {
      showError("Không thể cập nhật task. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECEDF6] flex flex-col items-center px-4 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-[#3F3D56] mb-8 sm:mb-10">
          TO—DO LIST
        </h1>
        <div className="w-full max-w-3xl">
          {/* Top bar skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="h-10 w-40 bg-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
          {/* Task list skeleton */}
          <div className="bg-[#DEDFEC] rounded-xl p-4 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg px-4 py-3 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-9 h-9 bg-gray-300 rounded-lg"></div>
                    <div className="w-9 h-9 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ECEDF6] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const filteredTasks = getFilteredAndSortedTasks();
  const counts = getTaskCounts();

  return (
    <div className="min-h-screen bg-[#ECEDF6] flex flex-col items-center px-4 py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-[#3F3D56] mb-8 sm:mb-10">
        TO-DO APP
      </h1>

      <div className="w-full max-w-3xl">
        {/* Top bar: Add button + sort button + filter dropdown */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="bg-[#5D5FEF] hover:bg-[#4f51e0] active:bg-[#4548c9] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-indigo-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/40"
          >
            Add Task
          </button>

          <div className="flex items-center gap-3">
            {/* Sort button */}
            <button
              type="button"
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="flex items-center gap-2 bg-[#D4D4DD] hover:bg-[#c8c8d3] text-[#3F3D56] font-medium px-4 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400/40"
              title={`Sort by ${sortOrder === "newest" ? "oldest" : "newest"} first`}
            >
              <ArrowUpDown className="size-4" strokeWidth={2} />
              <span className="text-sm">
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </span>
            </button>

            {/* Filter dropdown */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-[#D4D4DD] hover:bg-[#c8c8d3] text-[#3F3D56] font-medium px-5 py-2.5 pr-12 rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400/40"
              >
                <option value="all">All ({counts.total})</option>
                <option value="active">In Progress ({counts.active})</option>
                <option value="completed">
                  Completed ({counts.completed})
                </option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#3F3D56] pointer-events-none"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>
        <TodoForm
          isOpen={isFormOpen}
          initialData={editingTask}
          mode={editingTask ? "edit" : "add"}
          onAdd={editingTask ? handleEditSubmit : handleAdd}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
        {/* Task list */}
        <TodoList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Empty state */}
        {filteredTasks.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[#3F3D56] mb-2">
              {filter === "all"
                ? "No tasks yet"
                : filter === "active"
                  ? "No active tasks"
                  : "No completed tasks"}
            </h3>
            <p className="text-gray-500">
              {filter === "all"
                ? "Create your first task to get started!"
                : "Tasks will appear here when available."}
            </p>
          </div>
        )}
      </div>

      {/* Copyright Footer */}
      <footer className="mt-12 pb-8 text-center">
        <p className="text-gray-500 text-sm">© 2026 Nhat Khoi Trinh</p>
      </footer>
    </div>
  );
}
