import { Grid } from "@mui/material";
import { useState } from "react";
import { LectureInfo } from "./LectureInfo";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useSelector } from "react-redux";

const AllotedLecture = ({
    top,
    bottom,
    data,
    info,
    width,
    bgColor,
    height,
    handleDaD,
}) => {
    const [open, setOpen] = useState(false);
    const noColor = useSelector((state) => state.timetable.noColor);

    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: noColor ? "white" : bgColor,
                height,
                maxWidth: `${width} !important`,
                width: `${width} !important`,
                position: "relative",
                borderTop: top ? "1px solid black" : "none",
                borderBottom: bottom ? "1px solid black" : "none",
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
                semester={
                    noColor
                        ? ""
                        : data.semester?.code ||
                          data.sem_grps
                              .map(
                                  (semGrp) =>
                                      `${semGrp.semester.code}(${semGrp.group.code})`
                              )
                              .join(", ")
                }
            />
        </Grid>
    );
};

export default AllotedLecture;
