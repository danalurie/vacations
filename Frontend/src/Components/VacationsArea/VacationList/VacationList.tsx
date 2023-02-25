import VacationModel from "../../../Models/VacationModel";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";

function VacationList({ currentVacations }: { currentVacations: VacationModel[] }): JSX.Element {

    return (
        <div className="VacationList">

            {currentVacations.length === 0 && <Spinner />}

            {currentVacations && currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}

        </div>
    );
}

export default VacationList;
