import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList({ currentVacations }: { currentVacations: VacationModel[] }): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();

    return (
        <div className="VacationList">

            {currentVacations.length === 0 && <Spinner />}

            {currentVacations && currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
