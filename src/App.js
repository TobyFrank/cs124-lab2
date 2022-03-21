import {useState} from "react";
import 'react-tabs/style/react-tabs.css';
import './App.css';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Alert from "./Alert.js";
import Tasks from "./Tasks.js";

import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore, query, serverTimestamp, setDoc, orderBy, updateDoc } from "firebase/firestore";
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
    const [showPriorityDropdown, setShowPriorityDropdown] = useState([]);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState("");
    const [ascDesc, setAscDesc] = useState("asc");
    const [sortOrder, setSortOrder] = useState("text");
    const q = query(collection(db, collectionName), orderBy(sortOrder, ascDesc));
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
            {merge: true}).then(() => console.log("edit"));
        handleEditTaskToggle(taskId);
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

    function handleAddTask(taskText) {
        const id = generateUniqueID();
        setDoc(doc(db, collectionName, id),
            {
                id: id,
                text: taskText,
                completed: false,
                created: serverTimestamp(),
                priority: 1
            });
    }

    function handleChangeSortOrder(sortValue) {
        setSortOrder(sortValue);
    }

    function toggleDropdown() {
        setShowSortDropdown(!showSortDropdown);
    }

    function toggleModal(taskId) {
        setTaskToDelete(taskId);
        setShowAlert(!showAlert);
    }

    if (loading) {
        return <div className={"loading"}>Loading Task List...</div>
    }
    return (
        <div className={"app"}>
            <div className={"header"}>
                <Header sortOrder={sortOrder}
                        onSortOrder={handleChangeSortOrder}
                        showDropdown={showSortDropdown}
                        onShowDropdown={toggleDropdown}>
                </Header>
            </div>
            <div className={"tasks"}>
                {showAlert && <Alert onClose={toggleModal} onOK={handleDeleteTask} taskToDelete={taskToDelete}>
                    <div>
                        Are you sure you want to delete this task?
                    </div>
                </Alert>}
                <Tasks taskList={taskList}
                       editingTaskId={editingTaskId}
                       showPriorityDropdownList={showPriorityDropdown}
                       onEditTask={handleEditTask}
                       onCompletedTask={handleSetCompletedTask}
                       onDeleteTask={handleDeleteTask}
                       toggleModal={toggleModal}
                       showAlert={showAlert}></Tasks>
            </div>
            <div className="footer">
                <Footer onAddTask={handleAddTask}></Footer>
            </div>
        </div>
    )

}
export default App;
