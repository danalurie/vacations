import imageSource from "../../../Assets/Images/globe-logo.svg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu/>
            <img src={imageSource}/>
        </div>
    );
}

export default Header;
