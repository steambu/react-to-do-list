import React, { useState, useEffect } from "react";
import "./todoList.css";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return (
      savedTasks || [
        { text: "Trying out this Application", done: false },
        { text: "Tasks get saved in LocalStorage", done: false },
        { text: "Written with ChatGPT", done: false },
      ]
    );
  });
  const [filter, setFilter] = useState("all");

  const addTask = (text) => {
    const newTask = { text, done: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "done") {
      return task.done;
    } else if (filter === "not done") {
      return !task.done;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1 className="header">My Todo List</h1>
      <div className="filter">
        Filter:
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={handleFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="done"
            checked={filter === "done"}
            onChange={handleFilterChange}
          />
          Done
        </label>
        <label>
          <input
            type="radio"
            value="not done"
            checked={filter === "not done"}
            onChange={handleFilterChange}
          />
          Not done
        </label>
      </div>
      <div>
        <input
          className="input"
          type="text"
          placeholder="Add task"
          onKeyUp={(event) => {
            if (event.key === "Enter" && event.target.value !== "") {
              addTask(event.target.value);
              event.target.value = "";
            }
          }}
        />
      </div>
      <ul className="tasks">
        {filteredTasks.map((task, index) => (
          <li key={index} className="task">
            <span
              className={`task-text ${task.done ? "done" : ""}`}
              onClick={() => toggleDone(index)}
            >
              {task.text}
            </span>
            <button className="done-button" onClick={() => toggleDone(index)}>
              Done
            </button>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
