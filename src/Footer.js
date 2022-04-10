import "./Footer.css";
import {useState} from "react";
import lowPriorityIcon from "./lowPriority.png";
import medPriorityIcon from "./medPriority.png";
import highPriorityIcon from "./highPriority.png";

function Footer(props) {
    const priorityDict = {
        1: lowPriorityIcon,
        2: medPriorityIcon,
        3: highPriorityIcon
    }

    const [taskToAdd, setTaskToAdd] = useState(["New Task", 1, false]);
    const dbPath = "cs124-lab3";

    return (
        <div className="addTaskSection">
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
            <img type="image"
                   className="addPriorityIcon"
                   src={priorityDict[taskToAdd[1]]}
                   alt={"priority"}
                   onClick={(e ) => {
                       props.onPriorityDropdownToggle("addingTask");
                       e.stopPropagation();
                       e.preventDefault();
                   }}></img>
            {props.showPriorityDropdown === "addingTask" && <div className="priorityDropdown">
                <img src={priorityDict[1]}
                     className={taskToAdd[1] === 1 ? "selectedPriority" : "lowPriority"}
                     alt={"lowPriority"}
                     onClick={(e ) => {
                         setTaskToAdd([taskToAdd[0], 1, taskToAdd[2]]);
                         props.onPriorityDropdownToggle("addingTask");
                         e.stopPropagation();
                         e.preventDefault();
                     }}></img>
                <img src={priorityDict[2]}
                     className={taskToAdd[1] === 2 ? "selectedPriority" : "medPriority"}
                     alt={"medPriority"}
                     onClick={(e ) => {
                         setTaskToAdd([taskToAdd[0], 2, taskToAdd[2]]);
                         props.onPriorityDropdownToggle("addingTask");
                         e.stopPropagation();
                         e.preventDefault();
                     }}></img>
                <img src={priorityDict[3]}
                     className={taskToAdd[1] === 3 ? "selectedPriority" : "highPriority"}
                     alt={"highPriority"}
                     onClick={(e ) => {
                         setTaskToAdd([taskToAdd[0], 3, taskToAdd[2]]);
                         props.onPriorityDropdownToggle("addingTask");
                         e.stopPropagation();
                         e.preventDefault();
                     }}></img>
            </div>}
            <button className={"addTaskButton"} type={"button"} onClick={(e) => {
                props.onAddTask(taskToAdd, dbPath);
                setTaskToAdd(["New Task", taskToAdd[1], false]);
            }}>Add</button>
        </div>
    )
}

export default Footer;