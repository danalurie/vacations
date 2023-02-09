import axios from "axios";
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VcationState";
import appConfig from "../Utils/AppConfig";

class VacationForAdminService {
    public async getAllVacationForAdmin(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
            vacations = response.data;

            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action);
        }

        return vacations;
    }

    public async getOneVacationForAdmin(vacationId: number): Promise<VacationModel> {
        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === vacationId);
        
        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl, vacation.vacationId, { headers });
        const updatedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.adminVacationsUrl + vacationId);
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
    }
}

const vacationForAdminService = new VacationForAdminService();

export default vacationForAdminService;
