import "./TaskList.css";

import Task from "./Task.js";

function TaskList(props) {
    return (
        <div className={"taskList"}>
            {props.taskList.length === 0 ?
                <div>Oops! Looks like you have no tasks.</div> :
                <div>
                    {props.taskList.filter(task => !task.completed).map(task => <Task key={task.id}
                                                                                      taskData={task}
                                                                                      isChecked={task.completed}
                                                                                      showPriorityDropdownList={props.showPriorityDropdownList}
                                                                                      onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                                                                                      editingTaskId={props.editingTaskId}
                                                                                      editingTaskText={props.editingTaskText}
                                                                                      onEditTask={props.onEditTask}
                                                                                      onCompletedTask={props.onCompletedTask}
                                                                                      onDeleteTask={props.onDeleteTask}
                                                                                      toggleModal={props.toggleModal}/>)
                    }
                    {props.taskList.filter(task => task.completed).map(task => <Task key={task.id}
                                                                                     taskData={task}
                                                                                     isChecked={task.completed}
                                                                                     showPriorityDropdownList={props.showPriorityDropdownList}
                                                                                     onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                                                                                     editingTaskId={props.editingTaskId}
                                                                                     editingTaskText={props.editingTaskText}
                                                                                     onEditTask={props.onEditTask}
                                                                                     onCompletedTask={props.onCompletedTask}
                                                                                     onDeleteTask={props.onDeleteTask}
                                                                                     toggleModal={props.toggleModal}/>)
                    }
                    {props.showDeleteButton && <button className={"deleteCompleted"} type={"button"} onClick={(e) => props.onDeleteTask("", true)}>Delete All Completed Tasks</button>}
                </div>}
        </div>
    )
}

export default TaskList;
