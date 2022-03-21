import "./TaskList.css";

import Task from "./Task.js";

function TaskList(props) {
    return (
        <div className={"taskList"}>
            {props.taskList.length === 0 ?
                <div>Oops! Looks like you have no tasks.</div> :
                <div>
                    {props.taskList.filter(task =>
                        !props.completedTaskList.includes(task.id)).map(task => <Task key={task.id}
                                                                                      text={task.text}
                                                                                      id={task.id}
                                                                                      isChecked={task.completed}
                                                                                      editingTaskId={props.editingTaskId}
                                                                                      onEditTask={props.onEditTask}
                                                                                      onCompletedTask={props.onCompletedTask}
                                                                                      onToggleEditTaskId={props.onToggleEditTaskId}
                                                                                      onDeleteTask={props.onDeleteTask}
                                                                                      toggleModal={props.toggleModal}/>)
                    }
                    {props.taskList.filter(task =>
                        props.completedTaskList.includes(task.id)).map(task => <Task key={task.id}
                                                                                     text={task.text}
                                                                                     id={task.id}
                                                                                     isChecked={props.completedTaskList.includes(task.id)}
                                                                                     editingTaskId={props.editingTaskId}
                                                                                     onEditTask={props.onEditTask}
                                                                                     onCompletedTask={props.onCompletedTask}
                                                                                     onToggleEditTaskId={props.onToggleEditTaskId}
                                                                                     onDeleteTask={props.onDeleteTask}
                                                                                     toggleModal={props.toggleModal}/>)
                    }
                    {props.showDeleteButton && <button className={"deleteCompleted"} type={"button"} onClick={(e) => props.onDeleteTask("", true)}>Delete All Completed Tasks</button>}
                </div>}
        </div>
    )
}

export default TaskList;
