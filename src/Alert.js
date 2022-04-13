import "./Alert.css";
import {useEffect} from "react";

function Alert(props) {
    let textInput = null;
    useEffect(()=> {
        textInput.focus();
    });
    return (
        <div className={"backdrop"} onClick={(e) => props.onClose("", false)}>
            <div className="modal" aria-modal="true">
                {props.children}
                <div className="alert-buttons">
                    <div  id="first">
                    <button tabIndex={0}
                            className={"alert-button alert-cancel"}
                            type={"button"}
                            aria-label={"cancel button for ".concat( (props.taskToDeleteParams[1] ? "delete all completed tasks" : "delete task"))}
                            onClick={(e) => props.onClose("", false)}
                            ref={(button) => { textInput = button; }}>
                        Cancel
                    </button>
                    </div>
                    <div id="second">
                    <button tabIndex={0}
                            className={"alert-button alert-ok"} type={"button"}
                            aria-label={"OK button for ".concat( (props.taskToDeleteParams[1] ? "delete all completed tasks" : "delete task"))}
                            onClick={(e) => {
                                props.onClose("", false);
                                props.onOK(props.taskToDeleteParams[0], props.taskToDeleteParams[1]);
                            }}>
                        OK
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert;