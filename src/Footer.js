import "./Footer.css";
import {useState} from "react";

function Footer(props) {
    const [taskToAdd, setTaskToAdd] = useState("New Task");

    return (
        <div className="addTaskSection">
            <input className={"addTask"}
                   onClick={(e) => setTaskToAdd("")}
                   onChange={(e) => setTaskToAdd(e.target.value)}
                   onKeyDown={(e) => (e.code === "Enter") && (props.onAddTask(taskToAdd))}
                   onBlur={(e) => setTaskToAdd("New Task")}
                   value={taskToAdd}></input>
            <button className={"addTaskButton"} type={"button"} onClick={(e) => {
                props.onAddTask(taskToAdd);
                setTaskToAdd("New Task");
            }}>Add Task</button>
        </div>
    )
}

export default Footer;