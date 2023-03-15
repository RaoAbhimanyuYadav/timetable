import { Box, Typography } from "@mui/material";

import AddEditDialog from "../common/AddEditDialog";
import TableLayout from "../common/TableLayout";

const PageWrapper = ({
    title,
    tableHeadings,
    tableBodykey,
    selectorFunc,
    formFields,
    formSubmitHandler,
    deleteHandler,
}) => {
    return (
        <Box sx={{ padding: "clamp(12px, 4vw, 48px)", overflowX: "scroll" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 10px",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "clamp(10px,2vw,24px)",
                        fontWeight: "800",
                        fontFamily: "monospace",
                        letterSpacing: "0.1rem",
                        color: "#000",
                    }}
                >
                    {title}
                </Typography>
                <AddEditDialog
                    formFields={formFields}
                    formSubmitHandler={formSubmitHandler}
                    maxWidth={"md"}
                />
            </Box>
            <Box sx={{ height: "80vh", overflow: "scroll" }}>
                <TableLayout
                    tableHeadings={tableHeadings}
                    tableBodykey={tableBodykey}
                    selectorFunc={selectorFunc}
                    deleteHandler={deleteHandler}
                    formFields={formFields}
                    formSubmitHandler={formSubmitHandler}
                />
            </Box>
        </Box>
    );
};

export default PageWrapper;
