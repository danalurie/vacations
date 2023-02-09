import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        vacationForAdminService.getOneVacationForAdmin(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);    
                setValue("description", vacation.description);
                setValue("destination", vacation.destination);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("image", vacation.image);
                setVacation(vacation);
            })
            .catch(err => notify.error(err));
    }, [])

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationForAdminService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/vacations/edit");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <div className="EditVacation">
            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>
                
                {/* Hiding the id on the form in a Hidden input: */}
                <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                <label>start date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <button>Add</button>

            </form>

            <NavLink to="/vacations">Back</NavLink>
        </div>
    );
}

export default EditVacation;
