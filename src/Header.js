import "./Header.css";
import {useState} from "react";

function Header(props) {
    const listOfSortItems = ["text", "priority", "created"]
    const nextSortIndex = (listOfSortItems.indexOf(props.sortOrder) + 1)%listOfSortItems.length;
    return (
        <>
            <h2 className={"headerText"}>To Do List:</h2>
            <div className="dropdown">
                <button className="dropbtn"
                        onClick={(e) => props.onShowDropdown()}>
                    Dropdown</button>
                {props.showDropdown && <div id="myDropdown" className="dropdown-content">
                    <a onClick={(e) => props.onSortOrder("text")}>Alphabetical</a>
                    <a onClick={(e) => props.onSortOrder("priority")}>Priority</a>
                    <a onClick={(e) => props.onSortOrder("created")}>Date Created</a>
                </div>}
            </div>
        </>
    )
}

export default Header;