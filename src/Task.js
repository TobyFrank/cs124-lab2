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


import {useState} from "react";

function Task(props) {
    const priorityDict = {
        1: lowPriorityIcon,
        2: medPriorityIcon,
        3: highPriorityIcon
    }
    const taskData = props.taskData;
    const dbPath = "cs124-lab3".concat("/", taskData.id);
    const [editingTaskText, setEditingTaskText] = useState(taskData.text);
    const [taskToAdd, setTaskToAdd] = useState(["New Task", 1, false]);

    return (
        <div className="listItem" id={props.isChecked ? "completedTask" : "incompleteTask"}>
            <input type="checkbox" className={"checkbox"} checked={props.isChecked}
                   onChange={(e) => props.onEditTask(taskData.id, "completed", !taskData.completed, dbPath)}></input>
            <span className={"taskFlex"}>
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
                {props.subtaskId === taskData.id &&
                    <div>
                        {props.subtaskList.map(subtask => <Subtask key={subtask.id}
                                                                   taskData={subtask}
                                                                   subtaskId={props.subtaskId}
                                                                   isChecked={subtask.completed}
                                                                   showPriorityDropdown={props.showPriorityDropdown}
                                                                   onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                                                                   editingTaskId={props.editingTaskId}
                                                                   editingTaskText={props.editingTaskText}
                                                                   onEditTask={props.onEditTask}
                                                                   onDeleteTask={props.onDeleteTask}
                                                                   toggleModal={props.toggleModal}
                                                                   parentTaskData={taskData}></Subtask>)}
                        <div className={"addSubtaskSelection"}>
                            <input className={"subtaskIcon"}
                                   type={"image"}
                                   src={addSubtaskIcon}
                                   alt={"add subtask"}
                                   aria-label="add subtask"
                                   onClick={(e) => {
                                       props.onAddTask(taskToAdd, dbPath.concat("/subtaskCollection"));
                                       setTaskToAdd(["New Task", taskToAdd[1], false]);
                            }}></input>
                            <input className={"addTask"}
                                   onClick={(e) =>
                                       taskToAdd[0] === "New Task" && setTaskToAdd(["", taskToAdd[1], taskToAdd[2]])}
                                   onChange={(e) => setTaskToAdd([e.target.value, taskToAdd[1], taskToAdd[2]])}
                                   onKeyDown={(e) => {
                                       if (e.code === "Enter") {
                                           props.onAddTask(taskToAdd);
                                           setTaskToAdd(["", taskToAdd[1], taskToAdd[2]]);
                                       }
                                   }}
                                   value={taskToAdd[0]}></input>
                            <input type="image"
                                 className="subtaskIcon"
                                 src={priorityDict[taskToAdd[1]]}
                                 alt={"priority"}
                                 onClick={(e ) => setTaskToAdd([taskToAdd[0], (taskToAdd[1]+1)%3+1, taskToAdd[2]])}></input>

                        </div>
                    </div>
                }
            </span>
            <input type="image"
                   className="priorityIcon"
                   src={priorityDict[taskData.priority]}
                   alt={"priority"}
                   onClick={(e) => props.onEditTask(taskData.id, "priority", (taskData.priority+1)%3+1, dbPath)}></input>
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
                   onClick={(e) => props.toggleModal(dbPath, false)}></input>
            <input type="image" className="minimizeIcon"
                   aria-label="expand task list"
                   src={props.subtaskId === taskData.id ? minimizeIcon : expandIcon}
                   alt="delete"
                   onClick={(e) => {
                       props.onExpandTaskList(taskData.id);
                       console.log(props.subtaskList);
                   }}></input>
        </div>
    )
}

export default Task;