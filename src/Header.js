import "./Header.css";
import filterIcon from "./filter.png";

function Header(props) {
    return (
        <div className={"headerFlexbox"}>
            <p className={"headerText"}>To-Do List:</p>
            <div className="dropdown">
                <button className="dropdownButton"
                        onClick={(e) => {
                            props.onSortDropdownToggle(!props.showSortDropdown);
                            e.stopPropagation();
                            e.preventDefault();
                        }}>
                    <img className={"filterIcon"} src={filterIcon} alt={"filter tasks"}></img>
                    </button>
                {props.showSortDropdown && <div className={"paramDropdown"}>
                    <button className={"sortDirection"}
                       onClick={(e) => {
                           props.onSortDirectionToggle();
                           e.stopPropagation();
                           e.preventDefault();
                       }}>{props.sortDirection === "asc" ? "^ Sort Asc ^" : "v Sort Desc v"}</button>
                    <button className={props.sortParam === "text" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("text");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Alphabetical</button>
                    <button className={props.sortParam === "priority" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("priority");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Priority</button>
                    <button className={props.sortParam === "created" ? "currentParam" : "param"}
                       onClick={(e) => {
                           props.onSortParamChange("created");
                           e.stopPropagation();
                           e.preventDefault();
                       }}>Date Created</button>
                </div>}
            </div>
        </div>
    )
}

export default Header;