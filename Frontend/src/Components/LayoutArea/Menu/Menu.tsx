import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			
            <NavLink to="/user/vacations">Vacations</NavLink>
            <span> | </span>
            <NavLink to="/add">Add</NavLink>

        </div>
    );
}

export default Menu;
