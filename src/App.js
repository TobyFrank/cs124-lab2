import {useState} from "react";
import 'react-tabs/style/react-tabs.css';
import './App.css';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Alert from "./Alert.js";
import Tasks from "./Tasks.js";

import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore, query, serverTimestamp, setDoc, orderBy, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
    getAuth,
    sendEmailVerification,
    signOut } from "firebase/auth";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';

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
const auth = getAuth();

const collectionName = "cs124-lab5";

function App(props) {
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (loading) {
        return <div>Loading...</div>
    } else if (user) {
        return (<div>
            {user.displayName}{user.email}
            <SignedInApp {...props} user={user}/>
            <button type="button" onClick={() => signOut(auth)}>Sign out</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>)
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <div>
                <SignIn key="Sign In"/>
                <SignUp key="Sign Up"/>
            </div>
        </>
    }
}

function SignIn() {
    const [signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Sign in with email/pw
        </button>

        <hr/>
        <button onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e => setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Create test user
        </button>

    </div>
}

function SignedInApp(props) {
    const [editingTaskId, setEditingTaskId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [tabIndex, setTabIndex] = useState(1);
    const [taskToDeleteParams, setTaskToDeleteParams] = useState(["", false]);

    const [sortDirection, setSortDirection] = useState("asc");
    const [sortParam, setSortParam] = useState("text");
    const q = query(collection(db, collectionName), orderBy(sortParam, sortDirection));
    const [taskList, loadingTask] = useCollectionData(q);

    //,
    //         where("shared", "array-contains", props.user.email)

    const [qSubParams, setQSubParams] = useState([db, collectionName, "", ""]);
    const qSub = query(collection(qSubParams[0], qSubParams[1], qSubParams[2], qSubParams[3]), orderBy("priority", "desc"));
    const [subtaskId, setSubtaskId] = useState("");
    const [subtaskList, loadingSubtask] = useCollectionData(qSub);

    function handleSubtaskChange(taskId) {
        const queryParam = [db, collectionName, taskId, "subtaskCollection"]
        if (queryParam[2] === qSubParams[2]) {
            setQSubParams([db, collectionName, "", ""]);
            setSubtaskId("");
        } else {
            setQSubParams(queryParam);
            setSubtaskId(taskId);
        }
    }

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

    // function handleSetCompletedTask(taskId, dbPath) {
    //     setDoc(doc(db, dbPath),
    //         {completed: !(taskList.find(task => task.id === taskId).completed)}, {merge: true});
    // }

    function handleAddTask(taskInfo, dbPath) {
        console.log("add");
        const [taskText, taskPriority] = taskInfo;
        const id = generateUniqueID();
        setDoc(doc(db, dbPath.concat("/", id)),
            {
                id: id,
                text: taskText,
                completed: false,
                created: serverTimestamp(),
                priority: taskPriority,
                owner: props.user.uid,
                shared: [props.user.email]
            });
    }

    function handleDeleteTask(dbPath, ifDeleteAll) {
        if (ifDeleteAll) {
            console.log("delete all");
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

    function toggleShowSortDropdown(ifShow) {
        setShowSortDropdown(ifShow);
    }

    function toggleModal(taskId, ifDeleteAll) {
        setTaskToDeleteParams([taskId, ifDeleteAll]);
        setShowAlert(!showAlert);
    }
    if (loadingTask || loadingSubtask) {
        return <div className={"loading"}>Loading Task List...</div>
    } else {
        return (
            <div className={"app"} onClick={(e) => toggleShowSortDropdown(false)}>
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
                           subtaskList={subtaskList}
                           subtaskId={subtaskId}
                           editingTaskId={editingTaskId}
                           tabIndex={tabIndex}
                           setTabIndex={setTabIndex}
                           onEditTask={handleEditTask}
                           onDeleteTask={handleDeleteTask}
                           toggleModal={toggleModal}
                           showAlert={showAlert}
                           onExpandTaskList={handleSubtaskChange}
                           onAddTask={handleAddTask}></Tasks>
                </div>
                {tabIndex !== 2 &&
                    <div className="footer">
                        <Footer onAddTask={handleAddTask}></Footer>
                    </div>
                }
            </div>
        )
    }
}

export default App;
