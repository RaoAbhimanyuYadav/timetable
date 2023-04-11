import { Button, Grid, Table } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import DownloadPDFButton from "../common/DownloadPdfButton";
import ExtraLessons from "../wrappers/ExtraLessons";
import TimetableBody from "../wrappers/TimetableBody";
import TimetableHeader from "../wrappers/TimetableHeader";
import {
    cutLessonReducer,
    pasteLessonReducer,
    setObjDataReducer,
    setSelectedLessonReducer,
} from "../redux/reducers/timetableReducer";
import SaveButton from "../wrappers/SaveButton";
import GenerateButton from "../wrappers/GenerateButton";
import ObjCreator from "../wrappers/ObjCreator";

// TODO: print and different View
const serializer = (data) => {
    return JSON.parse(JSON.stringify(data));
};

const viewSelectorFunc = (state) => state.semester.semesterList;

const Generate = () => {
    const dispatch = useDispatch();

    const [classObj, setClassObj] = useState(undefined);

    const selectedLesson = useSelector(
        (state) => state.timetable.selectedLesson
    );
    const lessons = useSelector((state) => state.timetable.allLessons);

    const handleDaD = (info, data, method) => {
        if (method === "cut") {
            let lsn = { ...lessons.find((lsn) => lsn.id === data.id) };
            lsn["lesson_per_week"] = 1;
            dispatch(setSelectedLessonReducer(serializer(lsn)));

            if (info) {
                // Already alloted lesson i.e. it have day & time
                // remove entry for the lesson in classObj
                setClassObj((pre) => {
                    pre.removeAllotedLesson(info.day, info.time, lsn);
                    return pre;
                });

                let dayId = info.day.id;
                let timeId = info.time.id;
                dispatch(
                    cutLessonReducer({
                        lsn: serializer(lsn),
                        dayId,
                        timeId,
                    })
                );
            }
        } else if (method === "paste" && selectedLesson) {
            // check for the slot availability
            let isSlotAvailable = classObj.data.isTimeAvailableForSemster(
                info.day,
                selectedLesson,
                info.time
            );

            if (!isSlotAvailable.val) {
                dispatch(
                    showNotificationReducer({
                        msg: isSlotAvailable.msg.join(", "),
                        severity: "error",
                    })
                );
                return;
            }
            // available => assign lesson in classObj
            setClassObj((pre) => {
                pre.data.assignLecture(info.day, info.time, selectedLesson);
                return pre;
            });

            // Changes in UI
            let dayId = info.day.id;
            let timeId = info.time.id;

            dispatch(pasteLessonReducer({ dayId, timeId }));
        } else {
            dispatch(
                showNotificationReducer({
                    msg: "Please select a lesson",
                    severity: "warning",
                })
            );
        }
    };

    const handleDelete = () => {
        localStorage.removeItem("localData");
        localStorage.removeItem("extraLessons");
    };

    return (
        <Grid container padding={"10px"} gap={"10px"}>
            <Grid item xs={12}>
                <GenerateButton setClassObj={setClassObj} />
                <SaveButton classObj={classObj} />
                <Button onClick={handleDelete}>Delete Saved</Button>
                <DownloadPDFButton />
                <ObjCreator setClassObj={setClassObj} />
            </Grid>
            <Grid item xs={12} sx={{ overflow: "scroll", height: "75vh" }}>
                <Table
                    sx={{
                        tableLayout: "fixed",
                        width: "2500px",
                    }}
                    id={"pdf-content"}
                >
                    <TimetableHeader />
                    <TimetableBody
                        viewSelectorFunc={viewSelectorFunc}
                        handleDaD={handleDaD}
                    />
                </Table>
            </Grid>
            <Grid item xs={12}>
                <Grid container gap={"10px"}>
                    <ExtraLessons handleDaD={handleDaD} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Generate;
