import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import {ImBin} from "react-icons/im"
import {FaEdit} from "react-icons/fa"

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [checkedTodos, setCheckedTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: newTodo,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error:", error));

    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    if (checkedTodos.includes(id)) {
      fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      })
        .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
        .catch((error) => console.error("Error:", error));

      setCheckedTodos(checkedTodos.filter((todoId) => todoId !== id));
    }
  };

  const handleEditTodo = (id, task, completed) => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
        completed,
      }),
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleToggleCompleted = (id, completed) => {
    handleEditTodo(id, todos.find((todo) => todo.id === id).task, !completed);
  };

  const handleCheckboxChange = (id) => {
    if (checkedTodos.includes(id)) {
      setCheckedTodos(checkedTodos.filter((todoId) => todoId !== id));
    } else {
      setCheckedTodos([...checkedTodos, id]);
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h1 className="title_todo">Todo App</h1>
      <div className="input_btn">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <p className="lefttodos">{remainingTodos} Todos left</p>
      <div className="todos">

        {todos.map((todo) => (
          <div className="todo_input" key={todo.id}>
            <input
              type="checkbox"
              checked={checkedTodos.includes(todo.id)}
              onChange={() => handleCheckboxChange(todo.id)}
              className="check"
            />
            <span className={todo.completed ? "completed" : ""}>
              <div className="task">{todo.task}</div>
            </span>
            <button
            className="btn_delete"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={!checkedTodos.includes(todo.id)}
            >
              <ImBin/>
            </button>
            <button
            className="btn_edit"
              onClick={() =>
                handleEditTodo(
                  todo.id,
                  prompt("Edit Task:", todo.task),
                  todo.completed
                )
              }
            >
              <FaEdit/>
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TodoApp;
