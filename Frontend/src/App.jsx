import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);
  
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <>
     <div className="min-h-screen bg-dark text-black bg-black">
      <h1 className="text-4xl p-4">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
     </div>
     
    </>
  )
}

export default App
