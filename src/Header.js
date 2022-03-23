import "./Header.css";
import {useState} from "react";
import filterIcon from "./filter.png";

function Header(props) {
    // const listOfSortItems = ["text", "priority", "created"]
    // const nextSortIndex = (listOfSortItems.indexOf(props.sortOrder) + 1)%listOfSortItems.length;
    return (
        <div className={"headerFlexbox"}>
            <p className={"headerText"}>To Do List:</p>
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
                    <a href="#"
                       className={props.sortParam === "text" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("text");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Alphabetical</a>
                    <a href="#"
                       className={props.sortParam === "priority" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("priority");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Priority</a>
                    <a href="#"
                       className={props.sortParam === "created" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("created");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Newest</a>
                    <a href="#"
                       className={"sortDirection"}
                       onClick={(e) => {
                           props.onSortDirectionToggle();
                           e.stopPropagation();
                           e.preventDefault();
                       }}>{props.sortDirection === "asc" ? "^" : "v"}</a>
                </div>}
            </div>
        </div>
    )
}

export default Header;