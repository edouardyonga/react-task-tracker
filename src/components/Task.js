import {FaTimes} from "react-icons/fa"

const Task = ({task, onDel, onToggle}) => {
    return (
        <div className={` task ${ task.reminder ? 'reminder' : '' }` } onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color:'red',cursor:'pointer'}} onClick={onDel}/></h3>
            <p>{task.day}</p>
        </div>
    )
}
 
export default Task
