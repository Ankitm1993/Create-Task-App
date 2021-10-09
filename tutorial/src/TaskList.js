import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ items, deleteTask, editTask }) => {
  return (
    <div className='grocerylist'>
      {items.map((item) => {
        const { id, taskTitle } = item;
        return (
          <article key={id} className='grocery-item'>
            <p className='title'> {taskTitle} </p>
            <div className='btn-container'>
              <button type='button' className='edit-btn'>
                <FaEdit
                  style={{ color: "green" }}
                  onClick={() => editTask(id)}
                />
              </button>
              <button type='button' className='delete-btn'></button>
              <FaTrash
                style={{ color: "blue" }}
                onClick={() => deleteTask(id)}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default TaskList;
