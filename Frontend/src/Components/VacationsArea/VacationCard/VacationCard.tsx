import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import { blueGrey } from '@mui/material/colors';
import { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import vacationForUserService from "../../../Services/VacationForUserService";
import notify from "../../../Utils/Notify";
import "./VacationCard.css";

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
        
            <div className="cardBtn">{storedUserRole === "Admin" ?
                <div className="ButtonContainer">
                    <button className="EditBtn">
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationId} >
                            <ModeEditOutlineOutlinedIcon fontSize='inherit' />
                            Edit
                        </NavLink>
                    </button>
                    <button className="DeleteBtn">
                        <NavLink to="#" onClick={() => { deleteVacation(props.vacation.vacationId) }}>
                            <DeleteOutlineOutlinedIcon fontSize='inherit' />
                            Delete
                        </NavLink>
                    </button>
                </div>
                :
                <div>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={handleFollow} defaultChecked={isFollowed}
                        sx={{
                            color: blueGrey[800],
                            '&.Mui-checked': {
                                color: blueGrey[600],
                            }
                        }}
                    />
                    {props.vacation.followersCount}
                </div>
            }
            <br />
            <img className="imgCard" src={props.vacation?.imageName} />
            <br />
            </div >
            <div className='Destination'>
                {props.vacation.destination}
            </div>

            <div className='Description'>
                {props.vacation.description}
            </div>

            <div className='DateAndPrice'>
                <br />
                {new Date(props.vacation.startDate).toLocaleDateString("HE-IL").toString()} -
                {new Date(props.vacation.endDate).toLocaleDateString("HE-IL").toString()}
                <br />
                <br />
                {props.vacation.price}$
            </div>
        </div>
    );
}



export default VacationCard;





