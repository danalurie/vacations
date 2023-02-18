import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class VacationForUserService {
    public async getAllVacationForUser(): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
            vacations = response.data;

            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action);
        }

        return vacations;
    }

    public async follow(vacationId: number): Promise<void> {
        return axios.post(appConfig.followUrl + vacationId)
        .then(this.getAllIfFollow)

    }

    public async unfollow(vacationId: number): Promise<void> {
        return axios.delete(appConfig.followUrl + vacationId)
        .then(this.getAllIfFollow)

    }

    public async getAllIfFollow() {
        const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
        let vacations = response.data;
        const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
        vacationsStore.dispatch(action);
    }

}

const vacationForUserService = new VacationForUserService();

export default vacationForUserService;