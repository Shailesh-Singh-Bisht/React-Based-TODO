/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const { id, todo: todoTextOriginal, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todoTextOriginal);

  const handleEditSave = () => {
    if (completed) return;

    if (isEditing) {
      updateTodo(id, { ...todo, todo: todoText });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCheckboxChange = () => {
    toggleComplete(id);
  };

  const containerClasses = `
    flex border border-black/10 rounded-lg 
    px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 
    duration-300 text-black ${completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}
  `;

  const inputClasses = `
    border outline-none w-full bg-transparent rounded-lg 
    ${isEditing ? "border-black/10 px-2" : "border-transparent"}
    ${completed ? "line-through" : ""}
  `;

  return (
    <div className={containerClasses}>
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={completed}
        onChange={handleCheckboxChange}
      />
      <input
        type="text"
        className={inputClasses}
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        readOnly={!isEditing}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={handleEditSave}
        disabled={completed}
      >
        {isEditing ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
