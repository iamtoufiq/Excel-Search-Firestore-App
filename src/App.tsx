// App.tsx

import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import { TableContainer, Typography } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import SearchAppBar from "./components/SearchBar";
import InputFileUpload from "./components/InputFileUpload";
import { useDataContext } from "./context/DataContext";
import { fetchFirebaseData } from "./utils/utils";
import ShowTable from "./components/ShowTable";

const App: React.FC = () => {
  const { fetchData, state } = useDataContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const runOnce = useRef(false);

  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true;
      fetchData(); // Fetch data after the component mounts
    }
  }, [fetchData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SearchAppBar onSearch={setSearchTerm} />
      <InputFileUpload />
      <ShowTable searchTerm={searchTerm} />
    </div>
  );
};

export default App;
