import TodoItem from "./TodoItem.jsx";

/**
 * TodoList — wraps a list of TodoItem components.
 * Stateless: just receives the array and forwards callbacks.
 */
export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div className="bg-[#DEDFEC] rounded-xl p-4 space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
