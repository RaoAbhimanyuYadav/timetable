import {
  Box,
  Button,
  DialogTitle,
  InputLabel,
  MenuItem,
  styled,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";

export const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "clamp(6px,1.2vw,14px)",
  padding: "0",
  minWidth: "auto",
  fontWeight: "700",
  textTransform: "none",
}));

export const CustomCell = styled(TableCell)(({ theme }) => ({
  padding: "10px",
  border: "2px solid #000",
}));

export const CellInsideWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  fontSize: "clamp(10px,1.3vw,16px)",
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  fontSize: "clamp(10px,1.3vw,16px)",
  marginBottom: "15px",
  marginTop: "3px",
  "& .MuiInputBase-input": {
    padding: "5px 10px",
  },
}));

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "clamp(10px,1.3vw,16px)",
}));

export const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: "clamp(10px,1.3vw,16px)",
}));

export const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: "clamp(10px,2vw,24px)",
}));

export const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(10px,1.3vw,16px)",
  textAlign: "center",
}));
