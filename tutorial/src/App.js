import React, { useState, useEffect } from "react";

import TaskList from "./TaskList";
import TaskAlert from "./TaskAlert";

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskID, setEditTaskID] = useState(null);
  const [taskAlert, setTaskAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) {
      //  deal with empty alert
      showTaskAlert(true, "Please Input A Task", "danger");
    } else if (taskName && isEditing) {
      // deal with editing the task

      setTaskList(
        taskList.map((task) => {
          if (task.id === editTaskID) {
            return { ...task, taskTitle: taskName };
          }
          return task;
        })
      );
      setTaskName("");
      setEditTaskID(null);
      setIsEditing(false);
      showTaskAlert(true, "Task Successfully Edited", "success");
    } else {
      const newTask = {
        id: new Date().getTime().toString(),
        taskTitle: taskName,
      };

      setTaskList([...taskList, newTask]);
      setTaskName("");

      showTaskAlert(true, "Task Added Sucessfully", "success");
    }
  };

  const editTask = (id) => {
    const specificItem = taskList.find((task) => task.id === id);
    setIsEditing(true);
    setEditTaskID(id);
    setTaskName(specificItem.taskTitle);
  };

  const showTaskAlert = (show = false, msg = "", type = "") => {
    setTaskAlert({ show, msg, type });
  };

  const clearTask = () => {
    setTaskList([]);
    showTaskAlert(true, "All Tasks Removed", "danger");
  };

  const deleteTask = (id) => {
    showTaskAlert(true, "task removed", "danger");
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {taskAlert.show && (
          <TaskAlert {...taskAlert} removeTaskAlert={showTaskAlert} />
        )}
        <h3> Task Manager App </h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g finish homework'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? `Edit` : `Submit`}
          </button>
        </div>
      </form>

      {taskList.length > 0 && (
        <div className='grocery-container'>
          <TaskList
            items={taskList}
            deleteTask={deleteTask}
            editTask={editTask}
          />
          <button className='clear-btn' onClick={clearTask}>
            Clear Tasks
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
