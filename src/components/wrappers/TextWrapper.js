import { Typography } from "@mui/material";

const TextWrapper = ({ children }) => {
    // TODO Custom font size
    return (
        <Typography color={"#000"} variant="body1" sx={{ fontSize: "8px" }}>
            {children}
        </Typography>
    );
};

export default TextWrapper;
