import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationForAdminService.addVacation(vacation);
            notify.success("Vacation has been added");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    const validateEndDate = (args: ChangeEvent<HTMLInputElement>) => {
        setStartDate(args.target.valueAsDate);
    };

    return (
        <div className="AddVacation Box">
            <h2> Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <br/>
                <textarea {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                <br/>
                <label>start date: </label>
                <input type="date" onChange={validateEndDate} min={new Date().toISOString().substring(0, 10)} {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} min={new Date().toISOString().substring(0, 10)} />
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

export default AddVacation;
