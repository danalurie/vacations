import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - application level state:
export class VacationState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

// 3. Action - a single object describing single operation on the data:
export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
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

// 5. Store - Redux manager:
export const vacationsStore = createStore(vacationsReducer);