import { Box, Grid } from "@mui/material";
import React from "react";

const Item = ({ grp, gridSize }) => {
    return (
        <Grid item xs={gridSize} sx={{ padding: "2px" }}>
            <Box sx={{ backgroundColor: "#006e91", width: "100%" }}>
                {grp.code}
            </Box>
        </Grid>
    );
};

const GroupsUI = ({ groups }) => {
    const gridSize = 12 / (groups.length - 1 || 1);

    return (
        <Grid container>
            {groups.map((grp) => (
                <Item
                    key={grp.code}
                    grp={grp}
                    gridSize={grp.code === "W" ? 12 : gridSize}
                />
            ))}
        </Grid>
    );
};

export default GroupsUI;
