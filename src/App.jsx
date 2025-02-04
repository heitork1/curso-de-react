import AddTasks from "./components/AddTasks"
import Tasks from "./components/Tasks"
import { useEffect, useState } from "react";
import {v4} from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(()=>{
   localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(()=>{
    async function fetchTasks(){
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
        method: 'GET'
      });
      const data = await response.json()
  
      setTasks(data)
    }
    //fetchTasks();
  },[])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task, isCompleted: !task.isCompleted
        }
      } else {
        return task;
      }
    })
    setTasks(newTasks)
  }
  
  function onTaskDelete(taskId){
    const newTasks = tasks.filter((task)=>task.id !== taskId);
    setTasks(newTasks)
  }

  function onAddTaskSubmit(title, description){
    const newTask = {
      id: v4(),
      title, //:title
      description,//:description
      isCompleted: false,
    };
    //setTasks.push(newTask)
    setTasks([...tasks, newTask])
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onTaskDelete={onTaskDelete}/>
      </div>

    </div>
  )
}

export default App
