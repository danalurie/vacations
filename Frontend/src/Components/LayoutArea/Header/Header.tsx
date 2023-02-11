import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu/>
            {/* <FontAwesomeIcon icon="fa-duotone fa-earth-europe" /> */}
            <p>Vacations</p>
        </div>
    );
}

export default Header;
