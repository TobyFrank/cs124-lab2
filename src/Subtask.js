import lowPriorityIcon from "./lowPriority.png";
import medPriorityIcon from "./medPriority.png";
import highPriorityIcon from "./highPriority.png";
import {useState} from "react";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";

function Subtask(props) {
    const priorityDict = {
        0: lowPriorityIcon,
        1: medPriorityIcon,
        2: highPriorityIcon
    };
    const ariaPriorityDict = {
        0: "low priority",
        1: "medium priority",
        2: "high priority"
    };
    const taskData = props.taskData;
    const dbPath = "cs124-lab3".concat("/", props.subtaskId, "/subtaskCollection/", taskData.id);
    const [editingTaskText, setEditingTaskText] = useState(taskData.text);
    return (
        <div className="listItem" id={props.isChecked ? "completedTask" : "incompleteTask"}>
            <input type="checkbox"
                   className={"checkbox"}
                   checked={props.isChecked}
                   aria-label={"checkbox for ".concat(taskData.text)}
                   onChange={(e) => props.onEditTask(taskData.id, "completed", !taskData.completed, dbPath)}></input>
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
            <input type="image"
                   className="priorityIcon"
                   src={priorityDict[taskData.priority]}
                   alt={ariaPriorityDict[taskData.priority]}
                   aria-label={"priority icon for ".concat(taskData.text, " with ", ariaPriorityDict[taskData.priority])}
                   onClick={(e) => props.onEditTask(taskData.id, "priority", (taskData.priority+1)%3, dbPath)}></input>
            <input type="image" className="editIcon"
                   aria-label="edit task"
                   src={editIcon}
                   alt="edit"
                   aria-label={"edit icon for ".concat(taskData.text)}
                   onClick={(e) => {
                       props.onEditTask(taskData.id, "text", editingTaskText, dbPath);
                       setTimeout(() => document.getElementById(taskData.id).focus(), 10);
                   }}></input>
            <input type="image" className="deleteIcon"
                   aria-label="delete task"
                   src={deleteIcon}
                   alt="delete"
                   aria-label={"delete icon for ".concat(taskData.text)}
                   onClick={(e) => props.toggleModal(dbPath, false)}></input>
        </div>
    )



    // const taskData = props.taskData;
    // return (
    //     <div>
    //         <span>{taskData.id}</span>
    //         <span>{taskData.text}</span>
    //     </div>
    // )
}

export default Subtask;