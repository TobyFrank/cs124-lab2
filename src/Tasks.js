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
                          taskList={props.taskList.filter(task => !task.completed)}
                          subtaskList={props.subtaskList}
                          subtaskId={props.subtaskId}
                          emptyMessage={"Looks like you have no tasks to complete."}
                          showPriorityDropdown={props.showPriorityDropdown}
                          onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onCompletedTask={props.onCompletedTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={false}
                          onExpandTaskList={props.onExpandTaskList}></TaskList>
            </TabPanel>
            <TabPanel>
                <TaskList key="All"
                          taskList={props.taskList}
                          subtaskList={props.subtaskList}
                          subtaskId={props.subtaskId}
                          emptyMessage={"Looks like you have no tasks yet! Try adding some below."}
                          showPriorityDropdown={props.showPriorityDropdown}
                          onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onCompletedTask={props.onCompletedTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={true}
                          onExpandTaskList={props.onExpandTaskList}></TaskList>
            </TabPanel>
            <TabPanel>
                <TaskList key="Complete"
                          taskList={props.taskList.filter(task => task.completed)}
                          subtaskList={props.subtaskList}
                          subtaskId={props.subtaskId}
                          emptyMessage={"Looks like you have no completed tasks."}
                          showPriorityDropdown={props.showPriorityDropdown}
                          onPriorityDropdownToggle={props.onPriorityDropdownToggle}
                          editingTaskId={props.editingTaskId}
                          editingTaskText={props.editingTaskText}
                          onEditTask={props.onEditTask}
                          onCompletedTask={props.onCompletedTask}
                          onDeleteTask={props.onDeleteTask}
                          toggleModal={props.toggleModal}
                          showDeleteButton={true}
                          onExpandTaskList={props.onExpandTaskList}></TaskList>
            </TabPanel>
        </Tabs>
    )
}

export default Tasks;