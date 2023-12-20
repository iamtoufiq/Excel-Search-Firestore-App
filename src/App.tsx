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

const App: React.FC = () => {
  const { fetchData, state } = useDataContext();
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const runOnce = useRef(false);

  // useEffect(() => {
  //   if (runOnce.current) return;
  //   runOnce.current = !runOnce.current;
  //   const fetchFirebaseDataAndSetState = async () => {
  //     await fetchData();
  //   };

  //   fetchFirebaseDataAndSetState();
  // }, [fetchData]);
  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true;
      fetchData(); // Fetch data after the component mounts
    }
  }, [fetchData]);
  const handleSearch = () => {
    const filteredData = state?.data?.filter((item) => {
      if (item?.first_name && item?.last_name && item?.gender && item?.email) {
        return (
          item.first_name.includes(searchTerm) ||
          item.last_name.includes(searchTerm) ||
          item.gender.includes(searchTerm) ||
          item.email.includes(searchTerm)
        );
      }
      return false;
    });

    setData(filteredData || []);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SearchAppBar onSearch={setSearchTerm} />
      <InputFileUpload />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  First Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Last Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Gender
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email
                </Typography>
              </TableCell>
              {/* Add other table headers based on your Excel data */}
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((item, index) => {
              if (
                item?.first_name &&
                item?.last_name &&
                item?.gender &&
                item?.email
              ) {
                const matchesSearch =
                  item.first_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.last_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.gender
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.email.toLowerCase().includes(searchTerm.toLowerCase());

                if (!searchTerm || matchesSearch) {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.first_name || "-"}</TableCell>
                      <TableCell>{item.last_name || "-"}</TableCell>
                      <TableCell>{item.gender || "-"}</TableCell>
                      <TableCell>{item.email || "-"}</TableCell>
                    </TableRow>
                  );
                }
              }

              // Return null for non-matching or incomplete rows
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
