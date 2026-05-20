import React, { useRef } from "react";
import { useEffect, useState } from "react";
// import './App.css';

const App = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const inputRef = useRef(null)
  // console.log(inputRef.current);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    inputRef.current?.focus()
  }, [taskList])

  const addTaskHandler = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title: task,
        isDone: false
      }
      setTaskList([...taskList, newTask]);
      setTask("");
    }
  };
  // const deleteTaskHandler = (index) => {
  //   const newTaskList = [...taskList];
  //   newTaskList.splice(index, 1);
  //   setTaskList(newTaskList);
  // };

  const statusHandler = (e, index) => {
    if(e.target.tagName == 'LI'){
      const newTaskList = [...taskList];
      newTaskList[index].isDone = !newTaskList[index].isDone;
      setTaskList(newTaskList);
    } else if(e.target.tagName == 'BUTTON'){
      const newTaskList = [...taskList];
      newTaskList.splice(index, 1);
      setTaskList(newTaskList);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700 text-white">
      {/* container */}
      <div className="flex flex-col border-3 border-gray-900 p-4 rounded-lg min-h-100 bg-slate-800 gap-4">
        {/* task input */}
        <div className="flex gap-3">
          <input
            type="text"
            ref={inputRef}
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
        <ul className="flex flex-col w-full border-2 border-gray-900 rounded-lg gap-2 max-h-70 h-full " >
          {taskList.map((task, index) => (
            <li 
              className={`group p-3 bg-slate-600 rounded-lg flex flex-row justify-between ${task.isDone ? 'opacity-80' : ''}`}
              key={task.id}
              onClick={(e) => statusHandler(e, index)}
            >
              <p
                className={`${task.isDone && 'line-through' }`}
               >{task.title}</p>
              <button 
                className="bg-red-500 px-2 rounded hidden group-hover:block"
                onClick={() => deleteTaskHandler(index)}
              >Delete</button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default App;
