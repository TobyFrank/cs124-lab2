import "./Task.css";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";
import lowPriorityIcon from "./lowPriority.png";
import medPriorityIcon from "./medPriority.png";
import highPriorityIcon from "./highPriority.png";

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
                       onBlur={(e) => props.onEditTask(taskData.id, "text", editingTaskText)}
                       value={editingTaskText}></input> :
                <span className="taskText">{editingTaskText}</span>
            }
            <div className="priorityIcon">
                <img src={priorityDict[taskData.priority]} alt={"priority"} onClick={(e ) => console.log("priority change")}></img>
            </div>
            <img className="editIcon" src={editIcon} alt="edit" onClick={(e ) => props.onEditTask(taskData.id, "text", editingTaskText)}></img>
            <img className="deleteIcon" src={deleteIcon} alt="delete" onClick={(e) => props.toggleModal(taskData.id)}></img>
        </div>
    )
}

export default Task;