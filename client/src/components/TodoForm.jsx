import { useState, useEffect } from "react";
import { X } from "lucide-react";

/**
 * TodoForm — modal dialog for creating or editing a task.
 *
 * Owns its own form state (title + emoji) until submit.
 * On submit, calls onAdd with the new task data and closes itself.
 *
 * Props:
 *  - isOpen: boolean — controls visibility
 *  - onClose: () => void — called when user cancels or clicks backdrop
 *  - onAdd: (taskData) => void — called with { title, emoji } on submit
 *  - mode: "add" | "edit" — determines form title and button text
 *  - initialData: object — pre-fill form data for editing
 */
export default function TodoForm({
  isOpen,
  onClose,
  onAdd,
  mode = "add",
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");

  // Pre-fill form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setEmoji(initialData.emoji || "");
    } else {
      setTitle("");
      setEmoji("");
    }
  }, [initialData]);

  // Don't render anything when closed — saves DOM nodes and avoids
  // accidental focus traps.
  if (!isOpen) return null;

  // Reset form fields back to empty (only for add mode).
  const resetForm = () => {
    if (mode === "add") {
      setTitle("");
      setEmoji("");
    }
  };

  // Submit handler — validates, calls parent, then resets and closes.
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    // Defensive guard: don't submit empty titles.
    if (!trimmed) return;

    onAdd({
      title: trimmed,
      emoji: emoji.trim(),
    });

    resetForm();
    onClose();
  };

  // Cancel — discard input and close.
  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    // Backdrop — clicking outside the dialog closes it.
    <div
      onClick={handleCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-[fadeIn_0.2s_ease-out]"
    >
      {/* Dialog — stopPropagation so inside clicks don't trigger backdrop close */}
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="todo-form-title"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2
            id="todo-form-title"
            className="text-xl font-extrabold tracking-wide text-[#3F3D56]"
          >
            {mode === "edit" ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            aria-label="Close"
            className="size-8 rounded-lg flex items-center justify-center text-[#3F3D56] hover:bg-gray-100 transition-colors"
          >
            <X className="size-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title field */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-semibold text-[#3F3D56] mb-1.5"
            >
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              maxLength={120}
              autoFocus
              className="w-full bg-[#ECEDF6] text-[#3F3D56] placeholder:text-gray-400 px-4 py-2.5 rounded-lg border border-transparent focus:border-[#5D5FEF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-lg font-semibold text-[#3F3D56] hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="bg-[#5D5FEF] hover:bg-[#4f51e0] active:bg-[#4548c9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-indigo-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/40"
            >
              {mode === "edit" ? "Edit Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
