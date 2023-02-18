import { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import redHeartImage from "../../../Assets/Images/redHeart.png";
import blackHeartImage from "../../../Assets/Images/blackHeart.png";

import "./VacationCard.css";
import vacationForUserService from "../../../Services/VacationForUserService";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel>();
    const navigate = useNavigate();
    const storedUserRole = localStorage.getItem("userRole");

    async function deleteVacation(vacationId: number) {
        try {

            const sure = window.confirm("Are you sure?");
            if (!sure) return;

            await vacationForAdminService.deleteVacation(vacationId);
            notify.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    function handleFollow(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            vacationForUserService.follow(props.vacation.vacationId);
        }
        else {
            vacationForUserService.unfollow(props.vacation.vacationId);
        }
    }

    let isFollowed = false;
    if (props.vacation.isFollowing === 1) {
        isFollowed = true;
    }

    return (

        <div className="VacationCard Box">
            <img className="imgCard" src={props.vacation?.imageName} />
            <br />
            <div className="cardBtn">{storedUserRole === "Admin" ?
                <div>
                    <NavLink to={"/vacations/edit/" + props.vacation.vacationId} >✏️</NavLink>
                    <NavLink to="#" onClick={() => { deleteVacation(props.vacation.vacationId) }}>❌</NavLink>
                </div>
                :
                <div>
                <input type="checkbox" onChange={handleFollow} defaultChecked={isFollowed} />
                {props.vacation.followersCount}
                </div>

            }
            </div>
            {props.vacation.destination}
            <br />
            {props.vacation.description}
            <br />
            {new Date(props.vacation.startDate).toLocaleDateString("HE-IL").toString()} -
            <br />
            {new Date(props.vacation.endDate).toLocaleDateString("HE-IL").toString()}
            <br />
            <br />
            {props.vacation.price}$
        </div>
    );
}

export default VacationCard;





