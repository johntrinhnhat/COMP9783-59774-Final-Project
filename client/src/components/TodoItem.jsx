import { Trash2, Pencil, Check } from 'lucide-react';

/**
 * TodoItem — renders a single task row.
 * Pure presentational: receives data + callbacks via props, owns no state.
 */
export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg px-4 py-3 flex items-center justify-between gap-3 shadow-sm">
      {/* Left: checkbox + title + timestamp */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          className={`shrink-0 size-6 rounded-md flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-[#5D5FEF] hover:bg-[#4f51e0]'
              : 'bg-[#D4D4DD] hover:bg-[#c8c8d3]'
          }`}
        >
          {task.completed && (
            <Check className="size-4 text-white" strokeWidth={3} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`font-semibold text-[#3F3D56] truncate ${
              task.completed ? 'line-through opacity-60' : ''
            }`}
          >
            {task.title} {task.emoji}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{task.time}</p>
        </div>
      </div>

      {/* Right: delete + edit icon buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onDelete?.(task.id)}
          aria-label="Delete task"
          className="size-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <Trash2 className="size-4 text-[#3F3D56]" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => onEdit?.(task.id)}
          aria-label="Edit task"
          className="size-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <Pencil className="size-4 text-[#3F3D56]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}