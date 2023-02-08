import axios from "axios";
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel";
import { VacationsAction, VacationsActionType, vacationsStore } from "../Redux/VcationState";
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

    public async follow(userId: number, vacationId: number): Promise<void> {
        

    }


    public async unfollow(userId: number, vacationId: number): Promise<void> {


    }





}

const vacationForUserService = new VacationForUserService();

export default vacationForUserService;