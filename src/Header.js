import "./Header.css";
import {useState} from "react";
import filterIcon from "./filter.png";

function Header(props) {
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    // const listOfSortItems = ["text", "priority", "created"]
    // const nextSortIndex = (listOfSortItems.indexOf(props.sortOrder) + 1)%listOfSortItems.length;
    return (
        <div className={"headerFlexbox"}>
            <p className={"headerText"}>To Do List:</p>
            <div className="dropdown">
                <button className="dropbtn"
                        onClick={(e) => {
                            setShowSortDropdown(!showSortDropdown);
                        }}>
                    <img className={"filterIcon"} src={filterIcon}></img>
                    </button>
                {showSortDropdown && <div className={"dropdown-content"}>
                    <a href="#" onClick={(e) => props.onSortParamChange("text")}>Alphabetical</a>
                    <a href="#" onClick={(e) => props.onSortParamChange("priority")}>Priority</a>
                    <a href="#" onClick={(e) => props.onSortParamChange("created")}>Newest</a>
                </div>}
            </div>
        </div>
    )
}

export default Header;