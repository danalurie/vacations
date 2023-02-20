import imageSource from "../../../Assets/Images/coronaNotFound.png"
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <p>Page not found</p>
			<img src={imageSource}/>
        </div>
    );
}

export default PageNotFound;
