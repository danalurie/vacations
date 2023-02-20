import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList({ currentVacations }: { currentVacations: VacationModel[] }): JSX.Element {
    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!authStore.getState().user) {
            navigate("/home");
        }
        setUser(authStore.getState().user)
    }, []);

    return (
        <div className="VacationList">

            {currentVacations.length === 0 && <Spinner />}
            <>
                {user?.role === "Admin" && <NavLink to="/vacations/add"><Button variant="text">+Add</Button></NavLink>}
            </>
            <br />
            <br />
            {currentVacations && currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
