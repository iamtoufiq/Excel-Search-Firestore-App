import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Paper } from "@mui/material";
import { useDataContext } from "../context/DataContext";

const ShowTable = ({ searchTerm }: { searchTerm: string }) => {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const { fetchData, state } = useDataContext();
  return (
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
                item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  );
};

export default ShowTable;
