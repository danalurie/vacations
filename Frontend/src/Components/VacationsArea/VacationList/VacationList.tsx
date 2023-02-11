import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationState";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import vacationForUserService from "../../../Services/VacationForUserService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        if (user && user.role === "Admin") {
            vacationForAdminService.getAllVacationForAdmin()
                .then((vacations) => {
                    setVacations(vacations)
                    vacationsStore.subscribe(() => { setVacations(vacationsStore.getState().vacations) })

                })
                .catch((err) => notify.error(err));
        }
        else {
            vacationForUserService.getAllVacationForUser()
                .then((vacations) => {
                    setVacations(vacations);
                    vacationsStore.subscribe(() => { setVacations(vacationsStore.getState().vacations) })
                })
                .catch((err) => notify.error(err));
        }

    }, []);

    

    return (
        <div className="VacationList">
            { vacations.length === 0 && <Spinner /> }
            <NavLink to="/vacations/add">+</NavLink>
            <br/>
            {vacations && vacations.map(v => <VacationCard key={v.vacationId} vacation={v} isAdmin />)}
        </div>
    );
}

export default VacationList;
