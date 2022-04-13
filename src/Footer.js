import "./Footer.css";
import {useState} from "react";
import lowPriorityIcon from "./lowPriority.png";
import medPriorityIcon from "./medPriority.png";
import highPriorityIcon from "./highPriority.png";

function Footer(props) {
    const priorityDict = {
        0: lowPriorityIcon,
        1: medPriorityIcon,
        2: highPriorityIcon
    }

    const dbPath = "cs124-lab3";
    const [taskToAdd, setTaskToAdd] = useState(["New Task", 0, false]);

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
            <input type="image"
                   className="addPriorityIcon"
                   src={priorityDict[taskToAdd[1]]}
                   alt={"priority"}
                   onClick={(e ) => setTaskToAdd([taskToAdd[0], (taskToAdd[1]+1)%3, taskToAdd[2]])}></input>
            <button className={"addTaskButton"} type={"button"} onClick={(e) => {
                props.onAddTask(taskToAdd, dbPath);
                setTaskToAdd(["New Task", taskToAdd[1], false]);
            }}>Add</button>
        </div>
    )
}

export default Footer;