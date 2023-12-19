import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
}));

interface SearchAppBarProps {
  onSearch: (term: string) => void;
}

export default function SearchAppBar({ onSearch }: SearchAppBarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onSearch(""); // Call the parent component's search function with an empty string to reset the search
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingInline: "20px",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Search
            sx={{
              width: "95%",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              margin: "auto",
              paddingRight: "10px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search by name, gender, or email..."
              inputProps={{ "aria-label": "search" }}
            />
            <CloseIcon onClick={handleClearSearch} />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
