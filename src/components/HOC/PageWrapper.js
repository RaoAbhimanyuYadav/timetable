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
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 1rem 2rem 1rem",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "clamp(1rem,2vw,2.4rem)",
                        fontWeight: "800",
                        fontFamily: "monospace",
                        letterSpacing: "0.1rem",
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
