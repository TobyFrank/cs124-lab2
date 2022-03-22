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
            <img className="priorityIcon"
                 src={priorityDict[taskData.priority]}
                 alt={"priority"}
                 onClick={(e ) => props.onPriorityDropdownToggle(taskData.id)}></img>
            <img className="editIcon"
                 src={editIcon}
                 alt="edit"
                 onClick={(e ) => props.onEditTask(taskData.id, "text", editingTaskText)}></img>
            <img className="deleteIcon"
                 src={deleteIcon}
                 alt="delete"
                 onClick={(e) => props.toggleModal(taskData.id)}></img>
            {props.showPriorityDropdownList.includes(taskData.id) && <div className="priorityDropdown">
                <img src={priorityDict[1]} alt={"lowPriority"} onClick={(e ) => props.onEditTask(taskData.id, "priority", 1)}></img>
                <img src={priorityDict[2]} alt={"medPriority"} onClick={(e ) => props.onEditTask(taskData.id, "priority", 2)}></img>
                <img src={priorityDict[3]} alt={"highPriority"} onClick={(e ) => props.onEditTask(taskData.id, "priority", 3)}></img>
            </div>
            }
        </div>
    )
}

export default Task;