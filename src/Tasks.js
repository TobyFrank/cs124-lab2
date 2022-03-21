import "./Tasks.css";

import TaskList from "./TaskList.js";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

function Tasks(props) {
    return (
        <Tabs>
            <TabList>
                <Tab onClick={(e) => props.onToggleEditTaskId("")}>Incomplete</Tab>
                <Tab onClick={(e) => props.onToggleEditTaskId("")}>All</Tab>
                <Tab onClick={(e) => props.onToggleEditTaskId("")}>Complete</Tab>
            </TabList>

            <TabPanel>
                <TaskList key="Incomplete" taskList={props.taskList.filter(task => !task.completed)}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onCompletedTask={props.onCompletedTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={false}></TaskList>
            </TabPanel>
            <TabPanel>
                <TaskList key="All" taskList={props.taskList}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onCompletedTask={props.onCompletedTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={true}></TaskList>
            </TabPanel>
            <TabPanel>
                <TaskList key="Complete" taskList={props.taskList.filter(task => task.completed)}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onCompletedTask={props.onCompletedTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={true}></TaskList>
            </TabPanel>
        </Tabs>
    )
}

export default Tasks;