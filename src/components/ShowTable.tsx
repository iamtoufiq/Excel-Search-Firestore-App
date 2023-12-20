import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Paper } from "@mui/material";
import { useDataContext } from "../context/DataContext";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
  },
}));

const ShowTable = ({
  searchTerm,
  selectedOption,
}: {
  searchTerm: string;
  selectedOption: string;
}) => {
  const { state } = useDataContext();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                First Name
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                style={{ width: "fitContent" }}
              >
                Last Name
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Gender
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle1" fontWeight="bold">
                Email
              </Typography>
            </StyledTableCell>
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

              const matchesGender =
                selectedOption === "all" ||
                (selectedOption === "male" &&
                  item.gender.toLowerCase() === "male") ||
                (selectedOption === "female" &&
                  item.gender.toLowerCase() === "female") ||
                (selectedOption === "other" &&
                  item.gender.toLowerCase() !== "male" &&
                  item.gender.toLowerCase() !== "female");

              if (!searchTerm || matchesSearch) {
                if (matchesGender) {
                  return (
                    <TableRow key={index}>
                      <StyledTableCell>
                        {item.first_name || "-"}
                      </StyledTableCell>
                      <StyledTableCell>{item.last_name || "-"}</StyledTableCell>
                      <StyledTableCell>{item.gender || "-"}</StyledTableCell>
                      <StyledTableCell>{item.email || "-"}</StyledTableCell>
                    </TableRow>
                  );
                }
              }
            }
            return null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowTable;
