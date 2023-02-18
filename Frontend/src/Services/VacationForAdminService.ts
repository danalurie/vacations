import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationState";
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

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
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
        return this.getAllAndUpdate();
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        return axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers })
            .then(this.getAllAndUpdate)
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.adminVacationsUrl + vacationId);
        // vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
        return this.getAllAndUpdate();
    }


    public async getAllAndUpdate() {
        const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
        let vacations = response.data;
        const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
        vacationsStore.dispatch(action);
    }
}

const vacationForAdminService = new VacationForAdminService();

export default vacationForAdminService;
