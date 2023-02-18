import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList({ currentVacations }: { currentVacations: VacationModel[] }): JSX.Element {

    let user = authStore.getState().user
    return (
        <div className="VacationList">
            {currentVacations.length === 0 && <Spinner />}
            <>
                {user?.role === "Admin" && <NavLink to="/vacations/add">+</NavLink>}
            </>
            <br />
            <br />
            {currentVacations && currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default VacationList;
