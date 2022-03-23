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
    const [ascDesc, setAscDesc] = useState("asc");
    const [sortParam, setSortParam] = useState("text");
    const q = query(collection(db, collectionName), orderBy(sortParam, ascDesc));
    const [taskList, loading] = useCollectionData(q);

    // function debounce(func, timeout = 300){
    //     let timer;
    //     return (...args) => {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => { func.apply(this, args); }, timeout);
    //     };
    // }

    function handleEditTask(taskId, field, value) {
        setDoc(doc(db, collectionName, taskId),
            {[field]: value},
            {merge: true});
        if (field === "text") {
            handleEditTaskToggle(taskId);
        }
    }

    function handleSetCompletedTask(taskId) {
        setDoc(doc(db, collectionName, taskId),
            {["completed"]: !(taskList.find(task => task.id === taskId)["completed"])}, {merge: true});
    }

    function handleEditTaskToggle(taskId) {
        if (editingTaskId === taskId) {
            setEditingTaskId("");
        } else {
            setEditingTaskId(taskId);
        }
    }

    function handleDeleteTask(taskId, ifDeleteAll) {
        if (ifDeleteAll) {
            taskList.forEach(p => {p.completed && deleteDoc(doc(db, collectionName, p.id))})
        } else {
            deleteDoc(doc(db, collectionName, taskId))
        }
    }

    function handleAddTask(taskInfo) {
        const [taskText, taskPriority] = taskInfo;
        const id = generateUniqueID();
        setDoc(doc(db, collectionName, id),
            {
                id: id,
                text: taskText,
                completed: false,
                created: serverTimestamp(),
                priority: taskPriority
            });
    }

    function handleChangeSortParam(sortValue) {
        setSortParam(sortValue);
    }

    function toggleShowPriorityDropdown(taskId) {
        if (showPriorityDropdown === taskId) {
            setShowPriorityDropdown("");
        } else {
            setShowPriorityDropdown(taskId);
        }
    }

    function toggleShowSortDropdown(value) {
        setShowSortDropdown(value);
    }

    function toggleModal(taskId, deleteAll) {
        setTaskToDeleteParams([taskId, deleteAll]);
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
                        onSortDropdownToggle={toggleShowSortDropdown}>
                </Header>
            </div>
            <div className={"tasks"}>
                {showAlert && <Alert onClose={toggleModal} onOK={handleDeleteTask} taskToDeleteParams={taskToDeleteParams}>
                    <div>
                        {taskToDeleteParams[1] ?
                            "Are you sure you want to delete all completed tasks?" :
                            "Are you sure you want to delete this task?"}
                    </div>
                </Alert>}
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
