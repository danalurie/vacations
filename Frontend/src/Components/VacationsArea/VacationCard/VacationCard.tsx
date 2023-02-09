import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    isAdmin: boolean;
}

const navigate = useNavigate();

const [vacation, setVacation] = useState<VacationModel>();

async function deleteVacation() {
    try {

        const sure = window.confirm("Are you sure?");
        if (!sure) return;

        await vacationForAdminService.deleteVacation(vacation.vacationId);
        notify.success("Product has been deleted");
        navigate("/vacations");
    }
    catch (err: any) {
        alert(err.message);
    }
}


function VacationCard(props: VacationCardProps): JSX.Element {

    return (

        <div className="ProductCard Box">
            <div>
                {/* <img src={props.vacation.imageUrl} /> */}
                <br />
                {props.vacation.destination}
                <br />
                {props.vacation.description}
                <br />
                {new Date(props.vacation.startDate).toLocaleDateString("HE-IL").toString()} -
                <br></br>
                {new Date(props.vacation.endDate).toLocaleDateString("HE-IL").toString()}
                <br />
                <br />
                {props.vacation.price}$
            </div>
            <div>
                {props.isAdmin ? (
                    <div>
                        <NavLink to="/vacations/edit">✏️</NavLink>
                        <NavLink to="#" onClick={deleteVacation}>Delete</NavLink>
                    </div>

                ) : <button>💖</button>}
            </div>
        </div>
    );
}


export default VacationCard;





