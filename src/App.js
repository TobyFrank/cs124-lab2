import {useState} from "react";
import 'react-tabs/style/react-tabs.css';
import './App.css';

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Alert from "./Alert.js";
import Tasks from "./Tasks.js";
import googlelogo from "./colorgooglelogo.png";
import loginLogo from "./icon.ico";

import { initializeApp } from "firebase/app";
import { arrayUnion, collection, deleteDoc, doc, getFirestore, query, serverTimestamp, setDoc, orderBy, where } from "firebase/firestore";
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
    const [ifSignIn, setIfSignIn] = useState(true);

    function verifyEmail() {
        sendEmailVerification(user);
    }

    function toggleSignIn(value) {
        setIfSignIn(value);
    }
    if (loading) {
        return <div className={"loadingScreen"}>Loading...</div>
    } else if (user) {
        if (!(user.emailVerified)) {
            return <VerifyEmail verifyEmail={verifyEmail} toggleSignIn={toggleSignIn} auth={auth} />
        } else {
            return <SignedInApp {...props} user={user}/>
        }
    } else {
        return <>
            {ifSignIn ?
                <SignIn key="Sign In" toggleSignIn={toggleSignIn}/> :
                <SignUp key="Sign Up" toggleSignIn={toggleSignIn}/>
            }
            {error && <p>Authentication error: {error.message}</p>}
        </>
    }
}

function VerifyEmail(props) {
    const [verifyEmailSent, setVerifyEmailSent] = useState(false);
    if (verifyEmailSent) {
        return <>
            <div className={"SignInSection"}>
                Please check your email to verify your account!
                <p className={"ToggleSignIn"} onClick={() => {
                    signOut(props.auth);
                    props.toggleSignIn(true);
                }}>
                    Return to login
                </p>
            </div>

        </>
    } else {
        return <div className={"SignInSection"}>
            <p>
                Verify your email below
            </p>
            <button className={"verifyEmail"} type="button" onClick={() => {
                props.verifyEmail();
                setVerifyEmailSent(true);
            }}>Verify email
            </button>
            <p className={"ToggleSignIn"} onClick={() => {
                signOut(props.auth);
                props.toggleSignIn(true);
            }}>
                Log in with a different account
            </p>
        </div>
    }
}

function SignIn(props) {
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
        return <div className={"loadingScreen"}>Logging in…</div>
    }
    return <div className={"SignInSection"}>
        <img className={"loginLogo"} src={loginLogo} alt={"login logo"} />
        <label htmlFor='email'>Email:</label>
        <input type="text" className={"emailAndPw"} id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>Password: </label>
        <input type="text" className={"emailAndPw"} id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button className={"SignInButton"} onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Sign In
        </button>
        <hr/>
        <button className={"SignInGoogleButton"} onClick={() => signInWithGoogle()}>
            <img src={googlelogo} alt="Google Logo" width="24" height="24" />
            Sign in with Google
        </button>
        <p className={"ToggleSignIn"} onClick={() => props.toggleSignIn(false)}>
            Don't have an account? Create an account
        </p>
        {error1 && <p>Error logging in: {error1.message}</p>}
        {error2 && <p>Error logging in: {error2.message}</p>}
    </div>
}

function SignUp(props) {
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
        return <div className={"loadingScreen"}>Signing up…</div>
    }
    return <div className={"SignUpSection"}>
        <label htmlFor='email'>Enter Email: </label>
        <input type="text" className={"emailAndPw"} id='email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>Set Password: </label>
        <input type="text" className={"emailAndPw"} id='pw' value={pw}
               onChange={e => setPw(e.target.value)}/>
        <br/>
        <button className={"SignUpButton"} onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Create an Account
        </button>
        <p className={"ToggleSignIn"} onClick={() => props.toggleSignIn(true)}>
            Already have an account? Sign up
        </p>
        {error && <p>Error signing up: {error.message}</p>}
    </div>
}

function SignedInApp(props) {
    //  orderBy("priority", "desc")
    const [editingTaskId, setEditingTaskId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [sharingAlert, setSharingAlert] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [tabIndex, setTabIndex] = useState(1);
    const [taskToDeleteParams, setTaskToDeleteParams] = useState(["", false]);
    const [sharingParams, setSharingParams] = useState(["", ""]);

    const [sortDirection, setSortDirection] = useState("asc");
    const [sortParam, setSortParam] = useState("created");
    const q = query(collection(db, collectionName), where("shared", "array-contains", props.user.email), orderBy(sortParam, sortDirection));
    const [taskList, loadingTask, errorTask] = useCollectionData(q);

    const [qSubParams, setQSubParams] = useState(collection(db, collectionName, "", ""));
    const qSub = query(qSubParams, orderBy("priority", "desc"));
    const [subtaskId, setSubtaskId] = useState("");
    const [subtaskList, loadingSubtask, errorSubtask] = useCollectionData(qSub);

    function handleSubtaskChange(taskId) {
        const queryParam = collection(db, collectionName, taskId, "subtaskCollection")
        if (subtaskId === taskId) {
            setQSubParams(collection(db, collectionName, "", ""));
            setSubtaskId("");
        } else {
            setQSubParams(queryParam);
            setSubtaskId(taskId);
        }
    }

    function handleEditTask(taskId, field, value, dbPath) {
        if (field === "shared") {
            setDoc(doc(db, dbPath),
                {[field]: arrayUnion(value)},
                {merge: true});
            setSharingParams(["", ""]);
        } else {
            setDoc(doc(db, dbPath),
                {[field]: value},
                {merge: true});
            if (field === "text") {
                handleEditingTaskIdChange(taskId);
            }
        }
    }

    function handleEditingTaskIdChange(taskId) {
        if (editingTaskId === taskId) {
            setEditingTaskId("");
        } else {
            setEditingTaskId(taskId);
        }
    }

    function handleAddTask(taskInfo, dbPath) {
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
            taskList.forEach(p => {p.completed && deleteDoc(doc(db, collectionName, p.id))})
        } else {
            deleteDoc(doc(db, dbPath))
        }
    }

    function handleShareTask() {
        const value = sharingParams[0];
        const dbPath = sharingParams[1];
        handleEditTask("", "shared", value, dbPath);
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

    function toggleSharingModal(dbPath) {
        setSharingParams([sharingParams[0], dbPath])
        setSharingAlert(!sharingAlert);
    }

    if (loadingTask || loadingSubtask) {
        return <div className={"loadingScreen"}>Loading Task List...</div>
    } else if (errorTask) {
        return <div className={"SignInSection"}>
            <div className={"errorScreen"}>There has been an error in loading a task: {JSON.stringify(errorTask)}</div>
            <div>Auth: {props.user.uid}, {props.user.email}</div>
            <button className={"signOut"} type="button" onClick={() => signOut(auth)}>Sign out</button>
        </div>
    } else if (errorSubtask) {
        return <div>
            <div className={"errorScreen"}>There has been an error in loading a subtask: {JSON.stringify(errorSubtask)}</div>
            <div>Auth: {props.user.uid}, {props.user.email}</div>
        </div>
    } else {
        return (
            <div className={"app"} onClick={() => toggleShowSortDropdown(false)}>
                <div className={"userInfo"}>
                    <span className={"userEmail"}>Email: {props.user.email}</span>
                    <button className={"signOut"} type="button" onClick={() => signOut(auth)}>Sign out</button>
                </div>
                <div className={"header"}>
                    <Header sortParam={sortParam}
                            user={props.user}
                            onSortParamChange={handleChangeSortParam}
                            showSortDropdown={showSortDropdown}
                            onSortDropdownToggle={toggleShowSortDropdown}
                            sortDirection={sortDirection}
                            onSortDirectionToggle={toggleSortDirection}>
                    </Header>
                </div>
                {showAlert && <Alert onClose={toggleModal} onOK={handleDeleteTask} taskParams={taskToDeleteParams}>
                    <div>
                        {taskToDeleteParams[1] ?
                            "Are you sure you want to delete all completed tasks?" :
                            "Are you sure you want to delete this task?"}
                    </div>
                </Alert>}
                {sharingAlert && <Alert onClose={toggleSharingModal} onOK={handleShareTask} taskParams={sharingParams}>
                    <label htmlFor='email'>Enter Email: </label>
                    <input type="text" className={"emailAndPw"} id='email' value={sharingParams[0]}
                           onClick={e => e.stopPropagation()}
                           onChange={e => setSharingParams([e.target.value, sharingParams[1]])}/>
                </Alert>}
                <div className={"tasks"}>
                    <Tasks user={props.user}
                           taskList={taskList}
                           subtaskList={subtaskList}
                           subtaskId={subtaskId}
                           editingTaskId={editingTaskId}
                           tabIndex={tabIndex}
                           setTabIndex={setTabIndex}
                           onEditTask={handleEditTask}
                           onDeleteTask={handleDeleteTask}
                           toggleModal={toggleModal}
                           toggleSharing={toggleSharingModal}
                           showAlert={showAlert}
                           onExpandTaskList={handleSubtaskChange}
                           onAddTask={handleAddTask} />
                </div>
                {tabIndex !== 2 &&
                    <div className="footer">
                        <Footer onAddTask={handleAddTask} />
                    </div>
                }
            </div>
        )
    }
}

export default App;
