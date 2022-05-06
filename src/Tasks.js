import "./Tasks.css";

import TaskList from "./TaskList.js";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

function Tasks(props) {
    return (
        <Tabs selectedIndex={props.tabIndex} onSelect={index => props.setTabIndex(index)}>
            <TabList>
                <Tab tabIndex={"0"}>Incomplete</Tab>
                <Tab tabIndex={"0"}>All</Tab>
                <Tab tabIndex={"0"}>Complete</Tab>
            </TabList>

            <TabPanel>
                <TaskList key="Incomplete"
                          user={props.user}
                          taskList={props.taskList.filter(task => !task.completed)}
                          subtaskList={props.subtaskList}
                          subtaskId={props.subtaskId}
                          emptyMessage={"Looks like you have no tasks to complete."}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          toggleSharing={props.toggleSharing}
                          showDeleteButton={false}
                          onExpandTaskList={props.onExpandTaskList}
                          onAddTask={props.onAddTask}></TaskList>
            </TabPanel>
            <TabPanel>
                <TaskList key="All"
                          user={props.user}
                          taskList={props.taskList}
                          subtaskList={props.subtaskList}
                          subtaskId={props.subtaskId}
                          emptyMessage={"Looks like you have no tasks yet! Try adding some below."}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          toggleSharing={props.toggleSharing}
                          showDeleteButton={true}
                          onExpandTaskList={props.onExpandTaskList}
                          onAddTask={props.onAddTask}></TaskList>
            </TabPanel>
            <TabPanel>
                <TaskList key="Complete"
                          user={props.user}
                          taskList={props.taskList.filter(task => task.completed)}
                          subtaskList={props.subtaskList}
                          subtaskId={props.subtaskId}
                          emptyMessage={"Looks like you have no completed tasks."}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={true}
                          onExpandTaskList={props.onExpandTaskList}
                          onAddTask={props.onAddTask}></TaskList>
            </TabPanel>
        </Tabs>
    )
}

export default Tasks;