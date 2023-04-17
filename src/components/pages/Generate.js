import { FormControl, Grid, Table } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import DownloadPDFButton from "../common/DownloadPdfButton";
import ExtraLessons from "../wrappers/ExtraLessons";
import TimetableBody from "../wrappers/TimetableBody";
import TimetableHeader from "../wrappers/TimetableHeader";
import { toggleNoColorReducer } from "../redux/reducers/timetableReducer";
import GenerateButton from "../wrappers/GenerateButton";
import {
    CustomButton,
    CustomMenuItem,
    CustomTextField,
} from "../utils/customComponents";
import GetSavedData from "../wrappers/GetSavedData";
import { AllotedSlotNode } from "../utils/classes";
import ConfirmDelete from "../common/ConfirmDelete";
import LoadingSpinner from "../specific/LoadingSpinner";

// TODO: print and different View

const FUNC = [
    {
        selectorFunc: (state) => state.semester.semesterList,
        creator: (classObj) => classObj.data.semesterFormattedData(),
    },
    {
        selectorFunc: (state) => state.teacher.teacherList,
        creator: (classObj) => classObj.data.teacherFormattedData(),
    },
    {
        selectorFunc: (state) => state.classroom.classroomList,
        creator: (classObj) => classObj.data.classroomFormattedData(),
    },
];

const Generate = () => {
    const dispatch = useDispatch();

    const [classObj, setClassObj] = useState(undefined);
    const [generatedTimetable, setGeneratedTimetable] = useState({});
    const [selectedLesson, setSelectedLesson] = useState(undefined);
    const [view, setView] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleDaD = (info, data, method) => {
        if (method === "cut") {
            let lsn = { ...classObj.lessons.find((lsn) => lsn.id === data.id) };
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
                    if (view === 0) {
                        lsn.sem_grps.forEach((semGrp) => {
                            pre[semGrp.semester.id][dayId][timeId] = pre[
                                semGrp.semester.id
                            ][dayId][timeId].filter(
                                (allotedNode) =>
                                    allotedNode.group.id !== semGrp.group.id
                            );
                        });
                    } else if (view === 1) {
                        lsn.teachers.forEach((tchr) => {
                            pre[tchr.id][dayId][timeId] = [];
                        });
                    } else if (view === 2) {
                        pre[lsn.classroom.id][dayId][timeId] = [];
                    }
                    return pre;
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
                pre.removeFromExtraLessons(selectedLesson);
                return pre;
            });

            // Changes in UI
            let dayId = info.day.id;
            let timeId = info.time.id;

            setGeneratedTimetable((pre) => {
                if (view === 0) {
                    selectedLesson.sem_grps.forEach((semGrp) => {
                        let slot = new AllotedSlotNode(
                            selectedLesson,
                            0,
                            semGrp
                        );
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
                } else if (view === 1) {
                    selectedLesson.teachers.forEach((tchr) => {
                        let slot = new AllotedSlotNode(
                            selectedLesson,
                            0,
                            selectedLesson.sem_grps[0]
                        );
                        let tId = tchr.id;

                        if (!(tId in pre)) pre[tId] = {};
                        if (!(dayId in pre[tId])) pre[tId][dayId] = {};
                        if (!(timeId in pre[tId][dayId]))
                            pre[tId][dayId][timeId] = [];

                        pre[tId][dayId][timeId] = [slot];
                    });
                } else if (view === 2) {
                    let slot = new AllotedSlotNode(
                        selectedLesson,
                        0,
                        selectedLesson.sem_grps[0]
                    );
                    let tId = selectedLesson.classroom.id;

                    if (!(tId in pre)) pre[tId] = {};
                    if (!(dayId in pre[tId])) pre[tId][dayId] = {};
                    if (!(timeId in pre[tId][dayId]))
                        pre[tId][dayId][timeId] = [];

                    pre[tId][dayId][timeId] = [slot];
                }
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
        dispatch(
            showNotificationReducer({
                msg: "Successfully deleted.",
                severity: "success",
            })
        );
    };

    const handleSave = () => {
        if (classObj) {
            localStorage.setItem("localData", JSON.stringify(classObj.data));
            localStorage.setItem(
                "extraLessons",
                JSON.stringify(classObj.extraLessons)
            );
            dispatch(
                showNotificationReducer({
                    msg: "Saved Successfully",
                    severity: "success",
                })
            );
        } else {
            dispatch(
                showNotificationReducer({
                    msg: "Please Generate timetable first.",
                    severity: "error",
                })
            );
        }
    };

    const handleToggleColor = () => {
        dispatch(toggleNoColorReducer());
    };

    const handleViewChange = (e) => {
        setLoading(true);
        setView(e.target.value);
    };

    useEffect(() => {
        if (loading) setLoading(false);
    }, [generatedTimetable, loading]);

    useEffect(() => {
        if (loading) setLoading(false);
    }, [classObj, loading]);

    useEffect(() => {
        if (classObj) setGeneratedTimetable(FUNC[view].creator(classObj));
        else setLoading(false);
    }, [view]);

    return (
        <>
            <LoadingSpinner open={loading} />
            <Grid container padding={"10px"} gap={"10px"}>
                <Grid item xs={12}>
                    <Grid container gap={"20px"}>
                        <Grid item>
                            <FormControl fullWidth>
                                <CustomTextField
                                    select
                                    id="view-select"
                                    value={view}
                                    label="View"
                                    onChange={handleViewChange}
                                    size={"10px"}
                                >
                                    <CustomMenuItem value={0}>
                                        Semesters
                                    </CustomMenuItem>
                                    <CustomMenuItem value={1}>
                                        Teachers
                                    </CustomMenuItem>
                                    <CustomMenuItem value={2}>
                                        Classrooms
                                    </CustomMenuItem>
                                </CustomTextField>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <GenerateButton
                                setClassObj={setClassObj}
                                setGeneratedTimetable={setGeneratedTimetable}
                                creatorFunc={FUNC[view].creator}
                                setLoading={setLoading}
                            />
                        </Grid>
                        <Grid item>
                            <GetSavedData
                                setClassObj={setClassObj}
                                setGeneratedTimetable={setGeneratedTimetable}
                                creatorFunc={FUNC[view].creator}
                                setLoading={setLoading}
                            />
                        </Grid>
                        <Grid item>
                            <CustomButton onClick={handleSave}>
                                Save
                            </CustomButton>
                        </Grid>
                        <Grid item>
                            <ConfirmDelete
                                tableBodykey={[]}
                                data={{}}
                                deleteHandler={handleDelete}
                            />
                        </Grid>
                        <Grid item>
                            <DownloadPDFButton />
                        </Grid>
                        <Grid item>
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
                            viewSelectorFunc={FUNC[view].selectorFunc}
                            handleDaD={handleDaD}
                            generatedTimetable={generatedTimetable}
                        />
                    </Table>
                </Grid>
                <Grid item xs={12}>
                    <Grid container gap={"10px"}>
                        <ExtraLessons
                            handleDaD={handleDaD}
                            extraLessons={classObj?.extraLessons || []}
                            selectedLesson={selectedLesson}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Generate;
