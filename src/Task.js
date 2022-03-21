import "./Task.css";
import editIcon from "./edit.png";
import deleteIcon from "./delete.png";

function Task(props) {
    return (
        <div className="listItem" id={props.isChecked ? "completedTask" : "incompleteTask"}>
            <input type="checkbox" checked={props.isChecked} onChange={(e) => props.onCompletedTask(props.id)}></input>
            {props.editingTaskId === props.id ?
                <input className={props.id === props.editingTaskId ? "task editing" : "task"}
                       onChange={
                           (e) => props.onEditTask(props.id, "name", e.target.value)
                       }
                       value={props.text["name"]}></input> :
                <span className="taskName">{props.text}</span>
            }
            <img className="editIcon" src={editIcon} alt="edit" onClick={(e ) => props.onToggleEditTaskId(props.id)}></img>
            <img className="deleteIcon" src={deleteIcon} alt="delete" onClick={(e) => props.toggleModal(props.id)}></img>
        </div>
    )
}

export default Task;