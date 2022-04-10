import {useState} from "react";
import 'react-tabs/style/react-tabs.css';
import './App.css';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Alert from "./Alert.js";
import Tasks from "./Tasks.js";

import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore, query, serverTimestamp, setDoc, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxRZnwVYgJJSZOtNsJcxYGcCx-Ta_DAxk",
    authDomain: "cs124-lab3-1ad74.firebaseapp.com",
    projectId: "cs124-lab3-1ad74",
    storageBucket: "cs124-lab3-1ad74.appspot.com",
    messagingSenderId: "660026892825",
    appId: "1:660026892825:web:780ac3094a1656d26a4088"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const collectionName = "cs124-lab3";

function App() {
    const [editingTaskId, setEditingTaskId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState("");
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [tabIndex, setTabIndex] = useState(1);
    const [taskToDeleteParams, setTaskToDeleteParams] = useState(["", false]);
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortParam, setSortParam] = useState("text");
    const q = query(collection(db, collectionName), orderBy(sortParam, sortDirection));
    const [taskList, loading] = useCollectionData(q);

    function handleEditTask(taskId, field, value, dbPath) {
        setDoc(doc(db, dbPath),
            {[field]: value},
            {merge: true});
        if (field === "text") {
            handleEditingTaskIdChange(taskId);
        }
    }

    function handleEditingTaskIdChange(taskId) {
        if (editingTaskId === taskId) {
            setEditingTaskId("");
        } else {
            setEditingTaskId(taskId);
        }
    }

    function handleSetCompletedTask(taskId, dbPath) {
        setDoc(doc(db, dbPath),
            {completed: !(taskList.find(task => task.id === taskId).completed)}, {merge: true});
    }

    function handleAddTask(taskInfo, dbPath) {
        const [taskText, taskPriority, isList] = taskInfo;
        const id = generateUniqueID();
        setDoc(doc(db, dbPath.concat("/", id)),
            {
                id: id,
                text: taskText,
                completed: false,
                created: serverTimestamp(),
                priority: taskPriority,
                isList: isList
            });
    }

    function handleDeleteTask(ifDeleteAll, dbPath) {
        if (ifDeleteAll) {
            taskList.forEach(p => {p.completed && deleteDoc(doc(db, collectionName, p.id))})
        } else {
            deleteDoc(doc(db, dbPath))
        }
    }

    function toggleSortDirection() {
        if (sortDirection === "asc") {
            setSortDirection("desc");
        } else {
            setSortDirection("asc");
        }
    }

    function handleChangeSortParam(sortBy) {
        setSortParam(sortBy);
    }

    function toggleShowPriorityDropdown(taskId) {
        if (showPriorityDropdown === taskId) {
            setShowPriorityDropdown("");
        } else {
            setShowPriorityDropdown(taskId);
        }
    }

    function toggleShowSortDropdown(ifShow) {
        setShowSortDropdown(ifShow);
    }

    function toggleModal(taskId, ifDeleteAll) {
        setTaskToDeleteParams([taskId, ifDeleteAll]);
        setShowAlert(!showAlert);
    }

    if (loading) {
        return <div className={"loading"}>Loading Task List...</div>
    }
    return (
        <div className={"app"} onClick={(e) => {
            toggleShowPriorityDropdown("");
            toggleShowSortDropdown(false);
        }}>
            <div className={"header"}>
                <Header sortParam={sortParam}
                        onSortParamChange={handleChangeSortParam}
                        showSortDropdown={showSortDropdown}
                        onSortDropdownToggle={toggleShowSortDropdown}
                        sortDirection={sortDirection}
                        onSortDirectionToggle={toggleSortDirection}>
                </Header>
            </div>
            {showAlert && <Alert onClose={toggleModal} onOK={handleDeleteTask} taskToDeleteParams={taskToDeleteParams}>
                <div>
                    {taskToDeleteParams[1] ?
                        "Are you sure you want to delete all completed tasks?" :
                        "Are you sure you want to delete this task?"}
                </div>
            </Alert>}
            <div className={"tasks"}>
                <Tasks taskList={taskList}
                       editingTaskId={editingTaskId}
                       showPriorityDropdown={showPriorityDropdown}
                       onPriorityDropdownToggle={toggleShowPriorityDropdown}
                       tabIndex={tabIndex}
                       setTabIndex={setTabIndex}
                       onEditTask={handleEditTask}
                       onCompletedTask={handleSetCompletedTask}
                       onDeleteTask={handleDeleteTask}
                       toggleModal={toggleModal}
                       showAlert={showAlert}></Tasks>
            </div>
            {tabIndex !== 2 &&
                <div className="footer">
                    <Footer onAddTask={handleAddTask}
                            showPriorityDropdown={showPriorityDropdown}
                            onPriorityDropdownToggle={toggleShowPriorityDropdown}></Footer>
                </div>
            }
        </div>
    )

}
export default App;
