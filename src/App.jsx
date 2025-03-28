import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const contextValue = { todos, addTodo, updateTodo, deleteTodo, toggleComplete };

  return (
    <TodoProvider value={contextValue}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
