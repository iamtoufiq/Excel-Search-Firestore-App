// App.tsx

import React, { useEffect, useRef, useState } from "react";
import SearchAppBar from "./components/SearchBar";
import InputFileUpload from "./components/InputFileUpload";
import { useDataContext } from "./context/DataContext";
import ShowTable from "./components/ShowTable";

const App: React.FC = () => {
  const { fetchData } = useDataContext();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const runOnce = useRef(false);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true;
      fetchData();
    }
  }, [fetchData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SearchAppBar onSearch={setSearchTerm} />
      <div style={{ paddingBottom: "3rem" }}></div>
      <InputFileUpload
        handleRadioChange={handleRadioChange}
        selectedOption={selectedOption}
      />
      <ShowTable searchTerm={searchTerm} selectedOption={selectedOption} />
    </div>
  );
};

export default App;
