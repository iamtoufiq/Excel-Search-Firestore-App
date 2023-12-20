import React from "react";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDataContext } from "../context/DataContext";
import { PostDatatypes, addPostsToFirebase } from "../utils/firebaseUtils";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
interface InputFileUploadProps {
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption: string;
}
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FullWidthButton = styled(Button)({
  width: "200px",
  margin: "auto",
  position: "relative",
  "@media (max-width:500px)": {
    width: "95%",
    margin: "auto",
  },
});

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  handleRadioChange,
  selectedOption,
}) => {
  const { fetchData } = useDataContext();
  console.log("final check ing", selectedOption);
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log("this is", "handleFileUpload");
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const workbook = XLSX.read(e.target?.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const excelData: PostDatatypes[] = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

        await addPostsToFirebase(excelData);

        // Fetch data from Firebase
        fetchData();

        // Clear the input value to allow selecting the same file again
        event.target.value = "";
      };

      reader.readAsBinaryString(file);
    }
  };
  const StyledDiv = styled("div")({
    display: "flex",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const handleButtonClick = () => {
    // Trigger click on the hidden input when the button is clicked
    const fileInput = document.getElementById("file-input");
    fileInput?.click();
  };

  return (
    <StyledDiv>
      <FullWidthButton
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        Upload file
        {/* {selectedOption === "male" ? "start" : "end"} */}
      </FullWidthButton>
      <VisuallyHiddenInput
        id="file-input"
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
      />
      <div>
        <RadioGroup
          row
          aria-label="gender"
          name="gender"
          value={selectedOption}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </div>
    </StyledDiv>
  );
};

export default InputFileUpload;
