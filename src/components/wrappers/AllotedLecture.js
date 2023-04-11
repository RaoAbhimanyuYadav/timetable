import { Grid } from "@mui/material";
import { useState } from "react";
import { LectureInfo } from "./LectureInfo";
import ContentCutIcon from "@mui/icons-material/ContentCut";

const AllotedLecture = ({ data, info, width, bgColor, height, handleDaD }) => {
    const [open, setOpen] = useState(false);

    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: bgColor,
                height,
                maxWidth: `${width} !important`,
                width: `${width} !important`,
                position: "relative",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {open && (
                <ContentCutIcon
                    sx={{
                        fontSize: "12px",
                        position: "absolute",
                        top: 0,
                        left: "0",
                    }}
                    onClick={() => handleDaD(info, data, "cut")}
                />
            )}

            <LectureInfo
                room={data.classroom.code}
                subject={data.subject.code}
                teachers={data.teachers}
                height={height}
            />
        </Grid>
    );
};

export default AllotedLecture;
