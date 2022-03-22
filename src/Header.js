import "./Header.css";
import {useState} from "react";

function Header(props) {
    const listOfSortItems = ["text", "priority", "created"]
    // const nextSortIndex = (listOfSortItems.indexOf(props.sortOrder) + 1)%listOfSortItems.length;
    return (
        <>
            <h2 className={"headerText"}>To Do List:</h2>
            <div className="dropdown">
                <button className="dropbtn"
                        onClick={(e) => props.onShowSortDropdown()}>
                    Dropdown</button>
                {props.showSortDropdown && <div className="sortDropdown">
                    <a onClick={(e) => props.onSortOrder("text")}>Alphabetical</a>
                    <a onClick={(e) => props.onSortOrder("priority")}>Priority</a>
                    <a onClick={(e) => props.onSortOrder("created")}>Creation Date</a>
                </div>}
            </div>
        </>
    )
}

export default Header;