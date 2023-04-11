import { TableCell } from "@mui/material";

const CellWrapper = ({ children, colSpan, padding }) => {
    // TODO Custom height
    return (
        <TableCell
            colSpan={colSpan ? colSpan : 1}
            sx={{
                textAlign: "center",
                border: "1px solid black",
                height: "50px",
                padding: padding ? padding : "0",
            }}
        >
            {children}
        </TableCell>
    );
};

export default CellWrapper;
