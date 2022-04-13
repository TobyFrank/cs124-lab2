import "./Alert.css";

function Alert(props) {
    return (
        <div className={"backdrop"} onClick={(e) => props.onClose("", false)}>
            <div className="modal">
                {props.children}
                <div className="alert-buttons">
                    <div  id="first">
                    <button className={"alert-button alert-cancel"} type={"button"}
                            onClick={(e) => props.onClose("", false)}>
                        Cancel
                    </button>
                    </div>
                    <div id="second">
                    <button className={"alert-button alert-ok"} type={"button"}
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