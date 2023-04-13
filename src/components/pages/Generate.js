import { Grid, Table } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import DownloadPDFButton from "../common/DownloadPdfButton";
import ExtraLessons from "../wrappers/ExtraLessons";
import TimetableBody from "../wrappers/TimetableBody";
import TimetableHeader from "../wrappers/TimetableHeader";
import { toggleNoColorReducer } from "../redux/reducers/timetableReducer";
import GenerateButton from "../wrappers/GenerateButton";
import { CustomButton } from "../utils/customComponents";
import GetSavedData from "../wrappers/GetSavedData";
import { AllotedSlotNode } from "../utils/classes";

// TODO: print and different View

const viewSelectorFunc = (state) => state.semester.semesterList;

const Generate = () => {
    const dispatch = useDispatch();

    const [classObj, setClassObj] = useState(undefined);
    const [generatedTimetable, setGeneratedTimetable] = useState({});
    const [extraLessons, setExtraLessons] = useState([]);
    const [allLessons, setAllLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(undefined);

    const handleDaD = (info, data, method) => {
        if (method === "cut") {
            let lsn = { ...allLessons.find((lsn) => lsn.id === data.id) };
            lsn["lesson_per_week"] = 1;
            setSelectedLesson(lsn);

            if (info) {
                // Already alloted lesson i.e. it have day & time
                // remove entry for the lesson in classObj
                setClassObj((pre) => {
                    pre.removeAllotedLesson(info.day, info.time, lsn);
                    return pre;
                });

                let dayId = info.day.id;
                let timeId = info.time.id;

                setGeneratedTimetable((pre) => {
                    lsn.sem_grps.forEach((semGrp) => {
                        pre[semGrp.semester.id][dayId][timeId] = pre[
                            semGrp.semester.id
                        ][dayId][timeId].filter(
                            (allotedNode) =>
                                allotedNode.group.id !== semGrp.group.id
                        );
                    });
                    return pre;
                });

                setExtraLessons((pre) => {
                    let lsnFound = 0;
                    let newData = pre.map((lesson) => {
                        if (lesson.id === lsn.id) {
                            lsnFound = 1;
                            let newLsn = { ...lesson };
                            newLsn.lesson_per_week = lesson.lesson_per_week + 1;
                            return newLsn;
                        }
                        return lesson;
                    });
                    if (!lsnFound) {
                        newData.push(lsn);
                    }
                    return newData;
                });
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

            // avaialble => decrease lesson_per_week if 0 then remove
            setExtraLessons((pre) => {
                let newData = pre
                    .map((lesson) => {
                        if (lesson.id === selectedLesson.id) {
                            let newLsn = { ...lesson };
                            newLsn.lesson_per_week = lesson.lesson_per_week - 1;
                            if (newLsn.lesson_per_week === 0) return null;
                            return newLsn;
                        }
                        return lesson;
                    })
                    .filter((lesson) => lesson !== null);
                return newData;
            });

            // Changes in UI
            let dayId = info.day.id;
            let timeId = info.time.id;

            setGeneratedTimetable((pre) => {
                selectedLesson.sem_grps.forEach((semGrp) => {
                    let slot = new AllotedSlotNode(selectedLesson, 0, semGrp);
                    let semId = semGrp.semester.id;

                    if (!(semId in pre)) pre[semId] = {};
                    if (!(dayId in pre[semId])) pre[semId][dayId] = {};
                    if (!(timeId in pre[semId][dayId]))
                        pre[semId][dayId][timeId] = [];

                    pre[semId][dayId][timeId] = [
                        ...pre[semId][dayId][timeId],
                        slot,
                    ];
                });
                return pre;
            });
            setSelectedLesson(undefined);
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

    const handleSave = () => {
        localStorage.setItem("localData", JSON.stringify(classObj.data));
        localStorage.setItem("extraLessons", JSON.stringify(extraLessons));
    };

    const handleToggleColor = () => {
        dispatch(toggleNoColorReducer());
    };

    return (
        <Grid container padding={"10px"} gap={"10px"}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={2}>
                        <GenerateButton
                            setAllLessons={setAllLessons}
                            setExtraLessons={setExtraLessons}
                            setClassObj={setClassObj}
                            setGeneratedTimetable={setGeneratedTimetable}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <GetSavedData
                            setAllLessons={setAllLessons}
                            setExtraLessons={setExtraLessons}
                            setClassObj={setClassObj}
                            setGeneratedTimetable={setGeneratedTimetable}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <CustomButton onClick={handleSave}>Save</CustomButton>
                    </Grid>
                    <Grid item xs={2}>
                        <CustomButton onClick={handleDelete}>
                            Delete Saved
                        </CustomButton>
                    </Grid>
                    <Grid item xs={2}>
                        <DownloadPDFButton />
                    </Grid>
                    <Grid item xs={2}>
                        <CustomButton onClick={handleToggleColor}>
                            Toggle Color
                        </CustomButton>
                    </Grid>
                </Grid>
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
                        generatedTimetable={generatedTimetable}
                    />
                </Table>
            </Grid>
            <Grid item xs={12}>
                <Grid container gap={"10px"}>
                    <ExtraLessons
                        handleDaD={handleDaD}
                        extraLessons={extraLessons}
                        selectedLesson={selectedLesson}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Generate;
