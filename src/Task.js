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
    const dbPath = (taskData.isList ? "cs124-lab3".concat("/", props.parentDoc, "/subtaskList", taskData.id) : "cs124-lab3".concat("/", taskData.id));
    const [editingTaskText, setEditingTaskText] = useState(taskData.text);
    return (
        <div className="listItem" id={props.isChecked ? "completedTask" : "incompleteTask"}>
            <input type="checkbox" className={"checkbox"} checked={props.isChecked}
                   onChange={(e) => props.onCompletedTask(taskData.id, dbPath)}></input>
            {props.editingTaskId === taskData.id ?
                <input id={taskData.id}
                       className={"task editing"}
                       onChange={
                           (e) => setEditingTaskText(e.target.value)
                       }
                       onKeyDown={(e) => (e.code === "Enter") && props.onEditTask(taskData.id, "text", editingTaskText, dbPath)}
                       onBlur={(e) => props.onEditTask(taskData.id, "text", editingTaskText, dbPath)}
                       value={editingTaskText}></input> :
                <span id={taskData.id} className="task">{editingTaskText}</span>
            }
            {taskData.list ? <div></div> : <div></div>}
            <input type="image"
                   className="priorityIcon"
                   src={priorityDict[taskData.priority]}
                   alt={"priority"}
                   onClick={(e) => {
                       props.onPriorityDropdownToggle(taskData.id);
                       e.stopPropagation();
                       e.preventDefault();
                   }}></input>
            {props.showPriorityDropdown === taskData.id && <div className="priorityDropdown">
                <input type={"image"}
                       src={priorityDict[1]}
                       className={taskData.priority === 1 ? "selectedPriority" : "lowPriority"}
                       alt={"lowPriority"}
                       onClick={(e) => {
                           props.onEditTask(taskData.id, "priority", 1, dbPath);
                           props.onPriorityDropdownToggle(taskData.id);
                           e.stopPropagation();
                           e.preventDefault();
                       }}></input>
                <input type={"image"}
                       src={priorityDict[2]}
                       className={taskData.priority === 2 ? "selectedPriority" : "medPriority"}
                       alt={"medPriority"}
                       onClick={(e) => {
                           props.onEditTask(taskData.id, "priority", 2, dbPath);
                           props.onPriorityDropdownToggle(taskData.id);
                           e.stopPropagation();
                           e.preventDefault();
                       }}></input>
                <input type={"image"}
                       src={priorityDict[3]}
                       className={taskData.priority === 3 ? "selectedPriority" : "highPriority"}
                       alt={"highPriority"}
                       onClick={(e) => {
                           props.onEditTask(taskData.id, "priority", 3, dbPath);
                           props.onPriorityDropdownToggle(taskData.id);
                           e.stopPropagation();
                           e.preventDefault();
                       }}></input>
            </div>
            }
            <input type="image" className="editIcon"
                   aria-label="edit task"
                   src={editIcon}
                   alt="edit"
                   onClick={(e) => {
                       props.onEditTask(taskData.id, "text", editingTaskText, dbPath);
                       setTimeout(() => document.getElementById(taskData.id).focus(), 10);
                   }}></input>
            <input type="image" className="deleteIcon"
                   aria-label="delete task"
                   src={deleteIcon}
                   alt="delete"
                   onClick={(e) => props.toggleModal(false)}></input>
        </div>
    )
}

export default Task;