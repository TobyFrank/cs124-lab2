import "./Header.css";
import {useState} from "react";
import filterIcon from "./filter.png";

function Header(props) {
    const [titleName, setTitleName] = useState("To-Do List:")
    return (
        <div className={"headerFlexbox"}>
            <p className={"headerText"}>{titleName}</p>
            <div className="dropdown">
                <button className="dropdownButton"
                        onClick={(e) => {
                            props.onSortDropdownToggle(!props.showSortDropdown);
                            e.stopPropagation();
                            e.preventDefault();
                        }}>
                    <img className={"filterIcon"} src={filterIcon}></img>
                    </button>
                {props.showSortDropdown && <div className={"paramDropdown"}>
                    <span className={"sortDirection"}
                       onClick={(e) => {
                           props.onSortDirectionToggle();
                           e.stopPropagation();
                           e.preventDefault();
                       }}>{props.sortDirection === "asc" ? "^ Sort Asc ^" : "v Sort Desc v"}</span>
                    <span className={props.sortParam === "text" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("text");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Alphabetical</span>
                    <span className={props.sortParam === "priority" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("priority");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Priority</span>
                    <span className={props.sortParam === "created" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("created");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Add Date</span>
                </div>}
            </div>
        </div>
    )
}

export default Header;