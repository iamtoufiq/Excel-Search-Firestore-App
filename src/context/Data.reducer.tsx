import { PostDatatypes } from "../utils/firebaseUtils";

// Define ActionType as a union of action types
export type ActionType = "SET_LOADING" | "SET_DATA";

// Define the action interfaces
interface SetLoadingAction {
  type: "SET_LOADING";
}

interface SetDataAction {
  type: "SET_DATA";
  payload: PostDatatypes[];
}

export type Actions = SetLoadingAction | SetDataAction;

export interface InitialState {
  loading: boolean;
  data: PostDatatypes[];
}

export const reducer = (state: InitialState, action: Actions): InitialState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
