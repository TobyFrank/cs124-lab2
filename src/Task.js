import "./Task.css";
import Subtask from "./Subtask.js";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";
import lowPriorityIcon from "./lowPriority.png";
import medPriorityIcon from "./medPriority.png";
import highPriorityIcon from "./highPriority.png";
import minimizeIcon from "./minimize.png";
import expandIcon from "./expand.png";
import addSubtaskIcon from "./AddButton.png";
import shareIcon from "./share.png";
import deleteVoidIcon from "./voiddelete.png";
import shareVoidIcon from "./voidshare.png";

import {useState} from "react";

function Task(props) {
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
    const dbPath = "cs124-lab5".concat("/", taskData.id);
    const [editingTaskText, setEditingTaskText] = useState(taskData.text);
    const [taskToAdd, setTaskToAdd] = useState(["New Task", 0, false]);
    const isOwner = (props.user.uid === taskData.owner);

    return (
        <div className={isOwner ? "listItem" : "listItem shared"} id={props.isChecked ? "completedTask" : "incompleteTask"}>
            <input type="checkbox"
                   className={"checkbox"}
                   checked={props.isChecked}
                   aria-label={"checkbox for ".concat(taskData.text)}
                   onChange={(e) => props.onEditTask(taskData.id, "completed", !taskData.completed, dbPath)}></input>
            <div className={"nonCheckmarkFlex"}>
                <div className={"taskHeaderFlex"}>
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
                    {isOwner ?
                        <input type="image" className="shareIcon"
                           aria-label={"share task"}
                           src={shareIcon}
                           alt="share"
                           onClick={(e) => {
                               props.toggleSharing(dbPath);
                               setTimeout(() => document.getElementById(taskData.id).focus(), 10);}}>
                        </input> :
                        <img className="shareIcon" src={shareVoidIcon} alt={"share disallowed"}/>}
                    <input type="image" className="editIcon"
                           aria-label={"edit task for ".concat(taskData.text)}
                           src={editIcon}
                           alt="edit"
                           onClick={(e) => {
                               props.onEditTask(taskData.id, "text", editingTaskText, dbPath);
                               setTimeout(() => document.getElementById(taskData.id).focus(), 10);
                           }}></input>
                    {isOwner ?
                        <input type="image" className="deleteIcon"
                               aria-label={"delete task for ".concat(taskData.text)}
                               src={deleteIcon}
                               alt="delete"
                               onClick={(e) => props.toggleModal(dbPath, false)}>
                        </input> :
                        <img className="deleteIcon" src={deleteVoidIcon} alt={"share disallowed"}/>}
                    <input type="image" className="minimizeIcon"
                           aria-label={"expand subtask list for ".concat(taskData.text)}
                           src={props.subtaskId === taskData.id ? minimizeIcon : expandIcon}
                           alt="delete"
                           onClick={(e) => {props.onExpandTaskList(taskData.id)}}></input>
                </div>
                <div className={"subtaskListFlex"}>
                    {props.subtaskId === taskData.id &&
                        <div>
                            {props.subtaskList.map(subtask => <Subtask key={subtask.id}
                                                                       user={props.user}
                                                                       taskData={subtask}
                                                                       subtaskId={props.subtaskId}
                                                                       isChecked={subtask.completed}
                                                                       showPriorityDropdown={props.showPriorityDropdown}
                                                                       onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                                                                       editingTaskId={props.editingTaskId}
                                                                       editingTaskText={props.editingTaskText}
                                                                       onEditTask={props.onEditTask}
                                                                       toggleModal={props.toggleModal}
                                                                       parentTaskData={taskData}></Subtask>)}
                            <div className={"addSubtaskSelection"}>
                                <input className={"addSubtaskIcon"}
                                       type={"image"}
                                       src={addSubtaskIcon}
                                       alt={"add subtask"}
                                       aria-label="add subtask"
                                       onClick={(e) => {
                                           props.onAddTask(taskToAdd, dbPath.concat("/subtaskCollection"));
                                           setTaskToAdd(["New Task", taskToAdd[1], false]);
                                       }}></input>
                                <input className={"addSubtask"}
                                       onClick={(e) =>
                                           taskToAdd[0] === "New Task" && setTaskToAdd(["", taskToAdd[1], taskToAdd[2]])}
                                       onChange={(e) => setTaskToAdd([e.target.value, taskToAdd[1], taskToAdd[2]])}
                                       onKeyDown={(e) => {
                                           if (e.code === "Enter") {
                                               props.onAddTask(taskToAdd, dbPath.concat("/subtaskCollection"));
                                               setTaskToAdd(["", taskToAdd[1], taskToAdd[2]]);
                                           }
                                       }}
                                       value={taskToAdd[0]}></input>
                                <input type="image"
                                       className="priorityIcon"
                                       src={priorityDict[taskToAdd[1]]}
                                       alt={ariaPriorityDict[taskToAdd[1]]}
                                       onClick={(e ) => setTaskToAdd([taskToAdd[0], (taskToAdd[1]+1)%3, taskToAdd[2]])}></input>

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Task;