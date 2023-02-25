import { read } from "fs";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationForAdminService from "../../../Services/VacationForAdminService";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        vacationForAdminService.getOneVacation(+params.vacationId)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", new Date(vacation.startDate).toISOString().slice(0, 10));
                setValue("endDate", new Date(vacation.endDate).toISOString().slice(0, 10));
                setValue("price", vacation.price);
                setValue("image", vacation.image);
                setVacation(vacation);
                setStartDate(new Date(vacation.startDate));
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            vacation.image = vacation.image && (vacation.image as unknown as FileList)[0];            
            await vacationForAdminService.updateVacation(vacation);
            notify.success("Vacation has been updated");
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
        <div className="EditVacation Box">
            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)} className="EditForm">

                {/* Hiding the id on the form in a Hidden input: */}
                <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="textArea" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <br />
                <textarea {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                <br />
                <label>start date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} onChange={validateEndDate} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} min={startDate.toISOString().slice(0, -14)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")}/>
                <span className="Err">{formState.errors.image?.message}</span>

                <img className="EditImg" src={vacation?.imageName} />

                <button>Update</button>

            </form>

            <NavLink to="/vacations">Back</NavLink>
        </div>
    );
}

export default EditVacation;


