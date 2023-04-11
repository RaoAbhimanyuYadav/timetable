import React from "react";
import TextWrapper from "./TextWrapper";
import { Box } from "@mui/material";

const HeaderWrapper = ({ children }) => {
    return (
        <Box sx={{ padding: "5px" }}>
            <TextWrapper>{children}</TextWrapper>
        </Box>
    );
};

export default HeaderWrapper;
