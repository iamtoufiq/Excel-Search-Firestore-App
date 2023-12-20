// DataContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { reducer } from "./Data.reducer";
import { PostDatatypes, addPostsToFirebase } from "../utils/firebaseUtils";
import { fetchFirebaseData } from "../utils/utils";

interface InitialState {
  loading: boolean;
  data: PostDatatypes[];
}

const initialData: InitialState = {
  loading: false,
  data: [],
};

interface DataContextValue {
  state: InitialState;
  fetchData: () => void;
  postData: (data: PostDatatypes[]) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const DataContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchFirebaseData();
      dispatch({ type: "SET_DATA", payload: fetchedData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postData = (data: PostDatatypes[]) => {
    addPostsToFirebase(data);
  };

  return (
    <DataContext.Provider value={{ state, fetchData, postData }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export { DataContextProvider, useDataContext };
export default DataContext;
