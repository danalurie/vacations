import { createStore } from "redux";

export class PageState {
    public page: number;

}
export enum PageActionType {
    SetPage = "SetPage"
}

export interface PageAction {
    type: PageActionType;
    payload: number;
}

export function pageReducer(currentState = new PageState(), action: PageAction): PageState {
    const newState: PageState = { ...currentState };

    switch (action.type) {
        case PageActionType.SetPage:
            newState.page = action.payload;
            break;
    }
    return newState
}

export const pageStore = createStore(pageReducer);