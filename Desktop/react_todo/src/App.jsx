import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text, done: false }
    ]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul className="list">
        {todos.map(todo => (
          <li
  key={todo.id}
  className={todo.done ? "done" : ""}
  onClick={() => toggleTodo(todo.id)}
>
  {todo.text}
  <button
    onClick={(e) => {
      e.stopPropagation(); // 삭제 누르면 토글 안되게
      deleteTodo(todo.id);
    }}
  >
    삭제
  </button>
</li>

        ))}
      </ul>
    </div>
  );
}

export default App;

