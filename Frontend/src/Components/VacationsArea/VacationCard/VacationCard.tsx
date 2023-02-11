import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationState";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import "./VacationCard.css";


interface VacationCardProps {
    vacation: VacationModel;
    isAdmin: boolean;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel>();
    const navigate = useNavigate();

    async function deleteVacation(vacationId: number) {
        try {

            const sure = window.confirm("Are you sure?");
            if (!sure) return;

            await vacationForAdminService.deleteVacation(vacationId);
            notify.success("Product has been deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (

        <div className="ProductCard Box">

            <>
                <img src={props.vacation.imageName} />
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
            </>
            <div>
                {props.isAdmin ? (
                    <div>
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationId} >✏️</NavLink>
                        <NavLink to="#" onClick={() => { deleteVacation(props.vacation.vacationId) }}>❌</NavLink>
                    </div>

                ) : <button>
                    💖
                </button>}
            </div>
        </div>
    );
}


export default VacationCard;





