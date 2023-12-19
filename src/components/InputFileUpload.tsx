import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDataContext } from "../context/DataContext";
import { PostDatatypes, addPostsToFirebase } from "../utils/firebaseUtils";

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

const InputFileUpload: React.FC = () => {
  const { fetchData, postData } = useDataContext();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

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
        await fetchData();
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleButtonClick = () => {
    // Trigger click on the hidden input when the button is clicked
    const fileInput = document.getElementById("file-input");
    fileInput?.click();
  };

  return (
    <>
      <FullWidthButton
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        Upload file
      </FullWidthButton>
      <VisuallyHiddenInput
        id="file-input"
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
      />
    </>
  );
};

export default InputFileUpload;
