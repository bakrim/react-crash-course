import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer"
import About from "./components/About"
import {BrowserRouter as Router,Routes, Route } from "react-router-dom"

import { useState, useEffect } from "react"


function App() {

  const [showAddTask,setShowAddTask]=useState(false);

  useEffect(()=>{
    const getTasks= async ()=>{
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
   getTasks();

  },[]);

  //Fetch Tasks  
  const fetchTasks= async ()=>{
    const res=await fetch('http://localhost:5001/tasks');
    const data=await res.json();
    return data;
   };

     //Fetch Task
  const fetchTask= async (id)=>{
    const res=await fetch(`http://localhost:5001/tasks/${id}`);
    const data=await res.json();
    return data;
   };

  const [tasks,setTasks]=useState([]);

  

  //Add Task
  const addTask= async (task)=>{

    const res=await fetch('http://localhost:5001/tasks',
                          {method : 'POST',
                           headers : {
                            'Content-type': 'Application/json',
                           },
                           body : JSON.stringify(task),
                          } );

    const data =await res.json();

    setTasks([...tasks,data ])

    /*     const id =Math.floor(Math.random()*1000)+1;
    const newTask={id,...task};
    setTasks([...tasks,newTask]); */

  }

  //Detele Task
  const deleteTask=async (id)=>{
    await fetch(`http://localhost:5001/tasks/${id}`,{method:'DELETE'});
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  //Toogle Reminder
  const toogleReminder= async (id)=>{
    const taskToToogle=await fetchTask(id);
    const updTask={...taskToToogle, reminder: !taskToToogle.reminder}
    const res=await fetch(`http://localhost:5001/tasks/${id}`,
      {method : 'PUT',
       headers : {
        'Content-type': 'Application/json',
       },
       body : JSON.stringify(updTask),
      } );

      const date=await res.json();

     setTasks(tasks.map(
      (task)=>task.id===id? {...task,reminder:!task.reminder}:task
    ))
  }

  return (
  <Router>
     <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} /> 
      
    <Routes>
    <Route path="/" exact element={
      (
      <>
        {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?
      (<Tasks tasks={tasks} onDelete={deleteTask} onToogle={toogleReminder}/>) :
      ('No Task to show')
      }
        </>
      )} />
    <Route path='/about' Component={About} />
    </Routes>
    <Footer />
    </div> 
  </Router>
  );
}

export default App;
 