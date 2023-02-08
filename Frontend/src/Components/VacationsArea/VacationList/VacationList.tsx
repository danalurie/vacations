import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationForUserService from "../../../Services/VacationForUserService";
import notify from "../../../Utils/Notify";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    useEffect(() => {
        vacationForUserService.getAllVacationForUser()
            .then(vacations => {
                setVacations(vacations);
            console.log({vacations});


            })
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="VacationList">
        
            {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
