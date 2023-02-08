import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationState {
    public vacations: VacationModel[] = [];
}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function vacationsReducer(currentState = new VacationState(), action: VacationsAction): VacationState {
    const newState: VacationState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload
            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}

export const vacationsStore = createStore(vacationsReducer);