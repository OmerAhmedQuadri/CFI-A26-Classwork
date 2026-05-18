import React from "react";
import { useEffect, useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks")) || ['hello'],
  );
  console.log(taskList);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const addTaskHandler = () => {
    if (task.trim() !== "") {

      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700 text-white">
      {/* container */}
      <div className="flex flex-col border-3 border-gray-900 p-4 rounded-lg min-h-100 bg-slate-800 gap-4">
        {/* task input */}
        <div className="flex gap-3">
          <input
            type="text"
            className="border-2 border-gray-900 p-4 w-full rounded-lg font-bold bg-slate-600 text-white "
            placeholder="Enter your task here"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <button 
            onClick={addTaskHandler}
            className="p-3 px-6 border border-gray-900 rounded-lg bg-yellow-500"
          >Add</button>
        </div>
        {/* task list */}
        <ul className="flex flex-col w-full border-2 border-gray-900 rounded-lg gap-2 max-h-70 overflow-y-scroll" >
          {taskList.map((task, index) => (
            <li 
              className="p-3 bg-slate-600 rounded-lg"
              key={index}
            >{task}</li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default App;
