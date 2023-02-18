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
    const [userRole, setUserRole] = useState<string>("");
    const [user, setUser] = useState<UserModel>();

    const storedUserRole = localStorage.getItem("userRole");
    useEffect(() => {

        if (storedUserRole === "Admin") {
            vacationForAdminService.getAllVacationForAdmin()
            setVacations(vacationsStore.getState().vacations);
            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations)
            })
        }
        else {
            vacationForUserService.getAllVacationForUser()
            setVacations(vacationsStore.getState().vacations);
            vacationsStore.subscribe(() => {
                setVacations(vacationsStore.getState().vacations)
            })
        }

    }, [vacations]);

    const cardsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToDisplay = vacations.slice(startIndex, endIndex);

    return (
        <div className="VacationList">
            {vacations.length === 0 && <Spinner />}
            <>
                {storedUserRole === "Admin" && <NavLink to="/vacations/add">+</NavLink>}
            </>
            <br />
            <br />
            {vacations && vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
