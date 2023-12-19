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
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as XLSX from "xlsx";
import SearchAppBar from "./components/SearchBar";
import InputFileUpload from "./components/InputFileUpload";
import { useDataContext } from "./context/DataContext";
import { retrievePostsFromFirebase } from "./utils/firebaseUtils";
import { fetchFirebaseData } from "./utils/utils";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { fetchData, postData, state } = useDataContext();

  const runOnce = useRef(false);
  // useEffect(() => {
  //   if (runOnce.current) return;
  //   runOnce.current = !runOnce.current;
  //   fetchData();

  //   postData([
  //     {
  //       __EMPTY: 61,
  //       first_name: "string",
  //       last_name: "string",
  //       email: "string",
  //       gender: "string",
  //     },
  //   ]);
  // }, [fetchData, postData]);

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const workbook = XLSX.read(e.target?.result, { type: "binary" });
  //       const sheetName = workbook.SheetNames[0];
  //       const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  //       console.log("app data", excelData);
  //       setData(excelData); // Uncomment this line to update the state
  //       console.log(excelData);
  //     };

  //     reader.readAsBinaryString(file);
  //   }
  // };

  const handleSearch = () => {
    // Filter data based on search term
    const filteredData = data.filter(
      (item) =>
        item.firstname.includes(searchTerm) ||
        item.lastname.includes(searchTerm) ||
        item.gender.includes(searchTerm) ||
        item.email.includes(searchTerm)
    );
    console.log(filteredData);
  };

  useEffect(() => {
    if (runOnce.current) return;
    runOnce.current = !runOnce.current;
    const fetchFirebaseDataAndSetState = async () => {
      const firebaseData = await fetchFirebaseData();
      await fetchData();
      // setData(firebaseData);
    };

    fetchFirebaseDataAndSetState();
  }, []);
  console.log("thsi s nafi", state?.data);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <SearchAppBar />
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
            {state?.data &&
              state?.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {item.first_name ? item.first_name : "-"}
                  </TableCell>
                  <TableCell>{item.last_name ? item.last_name : "-"}</TableCell>
                  <TableCell>{item.gender ? item.gender : "-"}</TableCell>
                  <TableCell>{item.email ? item.email : "-"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
