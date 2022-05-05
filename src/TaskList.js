import "./TaskList.css";

import Task from "./Task.js";

function TaskList(props) {
    return (
        <div className={"taskList"}>
            {props.taskList.length === 0 ?
                <div>{props.emptyMessage}</div> :
                <div>
                    {props.taskList.filter(task => !task.completed).map(task => <Task key={task.id}
                                                                                      user={props.user}
                                                                                      taskData={task}
                                                                                      subtaskList={props.subtaskList}
                                                                                      subtaskId={props.subtaskId}
                                                                                      isChecked={task.completed}
                                                                                      editingTaskId={props.editingTaskId}
                                                                                      editingTaskText={props.editingTaskText}
                                                                                      onEditTask={props.onEditTask}
                                                                                      onDeleteTask={props.onDeleteTask}
                                                                                      toggleModal={props.toggleModal}
                                                                                      toggleSharing={props.toggleSharing}
                                                                                      onExpandTaskList={props.onExpandTaskList}
                                                                                      onAddTask={props.onAddTask}/>)
                    }
                    {props.taskList.filter(task => task.completed).map(task => <Task key={task.id}
                                                                                     user={props.user}
                                                                                     taskData={task}
                                                                                     subtaskList={props.subtaskList}
                                                                                     subtaskId={props.subtaskId}
                                                                                     isChecked={task.completed}
                                                                                     editingTaskId={props.editingTaskId}
                                                                                     editingTaskText={props.editingTaskText}
                                                                                     onEditTask={props.onEditTask}
                                                                                     onDeleteTask={props.onDeleteTask}
                                                                                     toggleModal={props.toggleModal}
                                                                                     toggleSharing={props.toggleSharing}
                                                                                     onExpandTaskList={props.onExpandTaskList}
                                                                                     onAddTask={props.onAddTask}/>)
                    }
                    {props.showDeleteButton && <button className={"deleteCompleted"} type={"button"} onClick={(e) => props.toggleModal("", true)}>Clear Completed Tasks</button>}
                </div>}
        </div>
    )
}

export default TaskList;
