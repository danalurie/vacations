import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    return (
        <div className="ProductCard Box">
            <div>
                {/* <img src={props.vacation.imageName} /> */}
                {/* {props.vacation.destination} */}
                <br />
                {/* {props.vacation.description} */}
                <br />
                {/* {props.vacation.startDate} - */}
                {/* {props.vacation.endDate} */}
                <br />
                {/* {props.vacation.price} */}
                afafvfa
            </div>
            <div>

            </div>
        </div>
    );
}


export default VacationCard;
