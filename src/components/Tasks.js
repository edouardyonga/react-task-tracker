import Task from "./Task"
const Tasks = ({tasks, onDel, onToggle}) => {
    return (
           tasks.map((task,index)=>(
           <Task key={index} task={task} onDel={()=> onDel(task.id)} onToggle = {onToggle}/>))
    )
}

export default Tasks
