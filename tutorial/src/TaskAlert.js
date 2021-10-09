import { useEffect, React } from "react";

const TaskAlert = ({ msg, type, removeTaskAlert }) => {
  useEffect(() => {
    const taskAlert = setTimeout(() => {
      removeTaskAlert();
      return () => {
        clearTimeout(taskAlert);
      };
    }, 2000);
  }, []);

  return (
    <div className={`alert alert-${type}`}>
      <p> {msg}</p>
    </div>
  );
};

export default TaskAlert;
