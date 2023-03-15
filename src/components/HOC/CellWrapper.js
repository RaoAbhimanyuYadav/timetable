import { Grid, TableCell } from "@mui/material";

const CellWrapper = ({ children }) => {
    return (
        <TableCell sx={{ padding: 0 }}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {children}
            </Grid>
        </TableCell>
    );
};

export default CellWrapper;
