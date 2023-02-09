import { log } from "console";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import vacationForUserService from "../../../Services/VacationForUserService";
import notify from "../../../Utils/Notify";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        if (user && user.role === "Admin") {
            vacationForAdminService.getAllVacationForAdmin()
                .then((vacations) => setVacations(vacations))
                .catch((err) => notify.error(err));
        }
        else {
            vacationForUserService.getAllVacationForUser()
                .then((vacations) => setVacations(vacations))
                .catch((err) => notify.error(err));
        }
    }, [vacations]);

    return (
        <div className="VacationList">
            {vacations && vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
