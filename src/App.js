import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import {BrowserRouter as Router, Route} from "react-router-dom"

import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [showAdd,setShowAdd] = useState(false)
  const [tasks,setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async ()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id)=>{
    const res = await fetch('http://localhost:5000/tasks/'+id)
    const data = await res.json()
    return data
  }
  // Add task
  const addTask = async (task)=>{
    console.log(task);
    
    // const id = Math.floor(Math.random()*1000)
    // const newTask = {id, ...task}
    
    const res = await fetch('http://localhost:5000/tasks/',{
    method:'POST',
    headers:{'content-type':'application/json'},
    body: JSON.stringify(task) 
    })

    const newTask = await res.json()
    console.log('newTask', newTask);
    console.log('Tasks', [newTask,...tasks]);
    
    setTasks([newTask,...tasks])
  }

  // Delete task
  const deleteTask = async (id)=>{
    await fetch('http://localhost:5000/tasks/'+id,{
    method:'DELETE' 
    })
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id)=>{

    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle,reminder:!taskToToggle.reminder}
    const res = await fetch('http://localhost:5000/tasks/'+id,{
      method:'PUT',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(updatedTask) 
    })

    const data = await res.json()
    setTasks(tasks.map((task)=>
      task.id === id?{...task,reminder: data.reminder}: task
    ))
  }
  // Toggle Reminder
  const toggleShowAdd = ()=>{
    setShowAdd(!showAdd)
  }

  return (
    <Router>
      <div className="container">
        <Header onShow={toggleShowAdd} show={showAdd}/>
        {showAdd && <AddTask addTask={addTask} />  }
          
        <Route path="/" exact render={(props)=>(
          <>
          {tasks.length>0 ?<Tasks tasks={tasks} onDel={deleteTask} onToggle={toggleReminder}/> : 'No Task To Show.'}
          </>
    
        )}/>

        <Route path="/about" component={About}/>
           <Footer/>
      </div>
    </Router>
  );
}


export default App;
