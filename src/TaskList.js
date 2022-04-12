import "./TaskList.css";

import Task from "./Task.js";
import { doc, getDoc } from "firebase/firestore";

function TaskList(props) {
    return (
        <div className={"taskList"}>
            {props.taskList.length === 0 ?
                <div>{props.emptyMessage}</div> :
                <div>
                    {props.taskList.filter(task => !task.completed).map(task => <Task key={task.id}
                                                                                      taskData={task}
                                                                                      subtaskList={props.subtaskList}
                                                                                      subtaskId={props.subtaskId}
                                                                                      isChecked={task.completed}
                                                                                      showPriorityDropdown={props.showPriorityDropdown}
                                                                                      onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                                                                                      editingTaskId={props.editingTaskId}
                                                                                      editingTaskText={props.editingTaskText}
                                                                                      onEditTask={props.onEditTask}
                                                                                      onDeleteTask={props.onDeleteTask}
                                                                                      toggleModal={props.toggleModal}
                                                                                      onExpandTaskList={props.onExpandTaskList}
                                                                                      onAddTask={props.onAddTask}/>)
                    }
                    {props.taskList.filter(task => task.completed).map(task => <Task key={task.id}
                                                                                     taskData={task}
                                                                                     subtaskList={props.subtaskList}
                                                                                     subtaskId={props.subtaskId}
                                                                                     isChecked={task.completed}
                                                                                     showPriorityDropdown={props.showPriorityDropdown}
                                                                                     onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                                                                                     editingTaskId={props.editingTaskId}
                                                                                     editingTaskText={props.editingTaskText}
                                                                                     onEditTask={props.onEditTask}
                                                                                     onDeleteTask={props.onDeleteTask}
                                                                                     toggleModal={props.toggleModal}
                                                                                     onExpandTaskList={props.onExpandTaskList}
                                                                                     onAddTask={props.onAddTask}/>)
                    }
                    {props.showDeleteButton && <button className={"deleteCompleted"} type={"button"} onClick={(e) => props.toggleModal("", true)}>Delete Completed</button>}
                </div>}
        </div>
    )
}

export default TaskList;
