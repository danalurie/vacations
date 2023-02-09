import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
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
            
            {vacations && vacations.map(v => <VacationCard key={v.vacationId} vacation={v} isAdmin/>)}
        </div>
    );
}

export default VacationList;
