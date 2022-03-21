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
    const [completedTaskList, setCompletedTaskList] = useState([517, 911, 231]);
    const [editingTaskId, setEditingTaskId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState("");
    // const [ascDesc, setAscDesc] = useState("asc");
    // const [order, setOrder] = useState("name");
    const order = "text";
    const ascDesc = "asc";
    const q = query(collection(db, collectionName), orderBy(order, ascDesc));
    const [taskList, loading] = useCollectionData(q);

    function handleEditTask(taskId, field, value) {
        setDoc(doc(db, collectionName, taskId),
            {[field]: value}, {merge: true});
    }

    function handleSetCompletedTask(taskId) {
        const ifTrue = taskList.filter(task => task.id === taskId)["completed"];
        console.log(ifTrue);
        setDoc(doc(db, collectionName, taskId),
            {["completed"]: !(taskList.filter(task => task.id === taskId)["completed"])}, {merge: true});
        // if (taskList[taskId].completed) {
        //
        // } else {
        //     setDoc(doc(db, collectionName, taskId),
        //         {["completed"]: true}, {merge: true});
        // }
        // if (completedTaskList.includes(taskId)) {
        //     setCompletedTaskList(completedTaskList.filter(id => id !== taskId));
        // } else {
        //     setCompletedTaskList([...completedTaskList, taskId]);
        // }
    }

    function handleEditTaskToggle(taskId) {
        if (editingTaskId === taskId) {
            setEditingTaskId("");
        } else {
            setEditingTaskId(taskId);
        }
    }

    function handleDeleteTask(taskId, deleteAll) {
        if (deleteAll) {
            taskList.forEach(p => {p.completed && deleteDoc(doc(db, collectionName, p.id))})
        } else {
            // Find person using their id
            deleteDoc(doc(db, collectionName, taskId))
        }
    }

    function handleAddTask(taskText) {
        const id = generateUniqueID();
        console.log(taskList);
        setDoc(doc(db, collectionName, id),
            {
                id: id,
                text: taskText,
                completed: false,
                created: serverTimestamp(),
                priority: 1
            });
        // setTaskList([{
        //     id: generateUniqueID(),
        //     text: taskText
        //     },
        //     ...taskList])
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
                <Header></Header>
            </div>
            <div className={"tasks"}>
                {showAlert && <Alert onClose={toggleModal} onOK={handleDeleteTask} taskToDelete={taskToDelete}>
                    <div>
                        Are you sure you want to delete this task?
                    </div>
                </Alert>}
                <Tasks taskList={taskList} completedTaskList={completedTaskList} editingTaskId={editingTaskId}
                       onEditTask={handleEditTask}
                       onCompletedTask={handleSetCompletedTask}
                       onToggleEditTaskId={handleEditTaskToggle}
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
