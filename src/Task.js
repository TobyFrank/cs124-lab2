import "./Task.css";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";
// import lowPriorityIcon "./lowPriority.png";
// import medPriorityIcon "./medPriority.png";
// import highPriorityIcon "./highPriority.png";

import {useState} from "react";

function Task(props) {
    const priorityDict = {
        1: lowPriorityIcon,
        2: medPriorityIcon,
        3: highPriorityIcon
    }
    const taskData = props.taskData;
    const [editingTaskText, setEditingTaskText] = useState(taskData.text);
    return (
        <div className="listItem" id={props.isChecked ? "completedTask" : "incompleteTask"}>
            <input type="checkbox" checked={props.isChecked} onChange={(e) => props.onCompletedTask(taskData.id)}></input>
            {props.editingTaskId === taskData.id ?
                <input className={taskData.id === props.editingTaskId ? "task editing" : "task"}
                       onChange={
                           (e) => setEditingTaskText(e.target.value)
                       }
                       onKeyDown={(e) => (e.code === "Enter") && props.onEditTask(taskData.id, "text", editingTaskText)}
                       value={editingTaskText}></input> :
                <span className="taskText">{editingTaskText}</span>
            }
            <img className="priorityIcon" src={priorityDict[taskData.priority]} alt={priorityDict[taskData.priority]} onClick={(e ) => console.log("priority change")}></img>
            <img className="editIcon" src={editIcon} alt="edit" onClick={(e ) => props.onEditTask(taskData.id, "text", editingTaskText)}></img>
            <img className="deleteIcon" src={deleteIcon} alt="delete" onClick={(e) => props.toggleModal(taskData.id)}></img>
        </div>
    )
}

export default Task;