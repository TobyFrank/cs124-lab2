import "./Tasks.css";

import TaskList from "./TaskList.js";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

function Tasks(props) {
    return (
        <Tabs>
            <TabList>
                <Tab>Incomplete</Tab>
                <Tab>All</Tab>
                <Tab>Complete</Tab>
            </TabList>

            <TabPanel>
                <TaskList key="Incomplete" taskList={props.taskList.filter(task => !task.completed)}
                          showPriorityDropdownList={props.showPriorityDropdownList}
                          onPriorityDropdownToggle={props.onPriorityDropdownToggle}
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
                          showPriorityDropdownList={props.showPriorityDropdownList}
                          onPriorityDropdownToggle={props.onPriorityDropdownToggle}
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
                          showPriorityDropdownList={props.showPriorityDropdownList}
                          onPriorityDropdownToggle={props.onPriorityDropdownToggle}
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