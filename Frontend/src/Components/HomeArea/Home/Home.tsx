// import imageSource from "../../../Assets/Images/homeImage.jpg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Home.css";
function Home(): JSX.Element {
    return (
        <div className="Home">
            
            <p>Find here the best vacation in the world!</p>
            {/* <img src={imageSource} /> */}
            <br/>
            <AuthMenu/>

        </div>
    );
}

export default Home;
