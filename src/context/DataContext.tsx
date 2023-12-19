import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { reducer, ActionType } from "./Data.reducer";
import { PostDatatypes, addPostsToFirebase } from "../utils/firebaseUtils";
import { fetchFirebaseData } from "../utils/utils";

// Define initial state
interface InitialState {
  loading: boolean;
}

const initialData = {
  loading: false,
  data: [],
};

// Define the context value type
interface DataContextValue {
  state: InitialState;
  setLoading: () => void;
  fetchData: () => void;
  postData: (data: PostDatatypes[]) => void;
}

// Create context
const DataContext = createContext<DataContextValue | undefined>(undefined);

// Create provider component
const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  // Fetch the updated data
  // const fetchData = () => {
  //   console.log("fetching the data");
  //   // TODO: call the firebase API to fetch the data
  // };
  const fetchData = async () => {
    console.log("fetching the data");
    try {
      // TODO: Call the firebase API to fetch the data
      const fetchedData = await fetchFirebaseData(); // Replace with actual API call
      dispatch({ type: "SET_DATA", payload: fetchedData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Post the data
  const postData = (data: PostDatatypes[]) => {
    console.log("postData the data", data);
    // TODO: call the firebase API to psot the data
    addPostsToFirebase(data);
  };

  const setLoading = () => {
    // dispatch({ type: ActionType.SET_LOADING });
  };

  return (
    <DataContext.Provider value={{ state, setLoading, fetchData, postData }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for using the context
const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export { DataContextProvider, useDataContext };
export default DataContext;
