import { Grid } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState } from "react";

export const EmptyLecture = ({ info, handleDaD }) => {
    const [open, setOpen] = useState(false);

    const handlePaste = () => {
        handleDaD(info, undefined, "paste");
    };

    return (
        <Grid
            item
            xs={12}
            sx={{ position: "relative", width: "100%", height: "100%" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {open && (
                <ContentPasteIcon
                    sx={{
                        fontSize: "22px",
                        position: "absolute",
                        top: 0,
                        left: "0",
                    }}
                    onClick={handlePaste}
                />
            )}
        </Grid>
    );
};
