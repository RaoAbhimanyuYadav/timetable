import {
    Badge,
    Box,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LESSON_URL } from "../constants/lessonConstant";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AllotedSlotNode, GeneratorClass, LessonNode } from "../utils/classes";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { showNotificationReducer } from "../redux/reducers/notificationReducer";
import DownloadPDFButton from "../common/DownloadPdfButton";

const Text = ({ children }) => {
    return (
        <Typography variant="body1" sx={{ fontSize: "8px" }}>
            {children}
        </Typography>
    );
};
const Cell = ({ children, colSpan }) => {
    return (
        <TableCell
            colSpan={colSpan ? colSpan : 1}
            sx={{
                textAlign: "center",
                border: "1px solid black",
                height: "50px",
                padding: "0",
            }}
        >
            {children}
        </TableCell>
    );
};

const HeaderDiv = ({ children }) => {
    return (
        <Box sx={{ padding: "5px" }}>
            <Text>{children}</Text>
        </Box>
    );
};
const gridItemCSS = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const Content = ({ subject, teachers, room, height }) => {
    return (
        <Grid container sx={{ height }}>
            <Grid item xs={12} sx={gridItemCSS}>
                <Text>{subject}</Text>
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                <Text>{room}</Text>
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                <Text>
                    {teachers.map(
                        (t, i) =>
                            `${t.code}${i + 1 === teachers.length ? "" : ", "}`
                    )}
                </Text>
            </Grid>
        </Grid>
    );
};

const EmptyDiv = ({ info, handleDaD }) => {
    const [open, setOpen] = useState(false);
    const handlePaste = () => {
        handleDaD(info, undefined, "paste");
    };
    return (
        <Box
            sx={{ position: "relative", width: "100%", height: "100%" }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {open && (
                <ContentPasteIcon
                    sx={{
                        fontSize: "12px",
                        position: "absolute",
                        top: 0,
                        left: "0",
                    }}
                    onClick={handlePaste}
                />
            )}
        </Box>
    );
};

const ContentWrapper = ({ data, info, width, bgColor, height, handleDaD }) => {
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
            }}
        >
            <Box
                sx={{ position: "relative", width: "100%", height: "inherit" }}
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

                <Content
                    room={data.classroom.code}
                    subject={data.subject.code}
                    teachers={data.teachers}
                    height={height}
                />
            </Box>
        </Grid>
    );
};

const Lecture = ({ data, rows, info, handleDaD }) => {
    let newData = [];
    for (let i = 1; i <= rows && rows > 1; i++) {
        let index = data.findIndex((d) => d.grpNum === i);
        if (index === -1) newData.push(null);
        else newData.push(data[index]);
    }

    return (
        <Grid
            container
            sx={{ display: "grid", height: "100%" }}
            gridTemplateRows={`repeat(${rows}, 1fr)`}
        >
            {(rows > 1 ? newData : data).map((d, i) =>
                d ? (
                    <ContentWrapper
                        info={info}
                        key={i}
                        data={d}
                        width={`${d.colSpan * 100}%`}
                        bgColor={d.color}
                        height={"100%"}
                        handleDaD={handleDaD}
                    />
                ) : (
                    <Grid key={i} item xs={12}>
                        <EmptyDiv info={info} handleDaD={handleDaD} />
                    </Grid>
                )
            )}
        </Grid>
    );
};

const DataDiv = ({ slotData, info, handleDaD }) => {
    return (
        <Lecture
            info={info}
            data={slotData}
            rows={slotData[0].isGrouped ? slotData[0].totalGroups : 1}
            handleDaD={handleDaD}
        />
    );
};

const DataCell = ({ generatedTimeTable, sem, day, timeslot, handleDaD }) => {
    const slotData =
        generatedTimeTable[sem.id] && generatedTimeTable[sem.id][day.id]
            ? generatedTimeTable[sem.id][day.id][timeslot.id]
            : undefined;

    const info = {
        day: day,
        time: timeslot,
    };

    return (
        <Cell>
            {slotData && slotData.length > 0 ? (
                <DataDiv
                    slotData={slotData}
                    info={info}
                    handleDaD={handleDaD}
                />
            ) : (
                <EmptyDiv info={info} handleDaD={handleDaD} />
            )}
        </Cell>
    );
};

// TODO: print and different View

const Generate = () => {
    const axios = useAxiosPrivate();
    const dispatch = useDispatch();

    const [classObj, setClassObj] = useState(undefined);
    const [generatedTimeTable, setGeneratedTimeTable] = useState([]);
    const [lessons, setLessons] = useState(undefined);
    const [extraLessons, setExtraLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(undefined);

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);
    const semesters = useSelector((state) => state.semester.semesterList);

    const handleGenerate = () => {
        // TODO: Randomize generation
        if (!lessons) {
        }
        // else {
        //     classObj.generateTimeTable();
        //     setExtraLessons(classObj.lessonNotAssigned);
        //     setGeneratedTimeTable(classObj.data.generateFormattedData());
        // }
    };

    const handleDaD = (info, data, method) => {
        if (method === "cut") {
            let lsn = lessons.find((lsn) => lsn.id === data.id);
            lsn["lesson_per_week"] = 1;
            setSelectedLesson(lsn);

            if (info) {
                // Already alloted lesson i.e. it have day & time
                // remove entry for the lesson in classObj
                setClassObj((pre) => {
                    pre.removeAllotedLesson(info.day, info.time, lsn);
                    return pre;
                });

                // UI changes
                let dayId = info.day.id;
                let timeId = info.time.id;
                setGeneratedTimeTable((pre) => {
                    lsn.semester_groups.forEach((semGrp) => {
                        pre[semGrp.semester.id][dayId][timeId] = pre[
                            semGrp.semester.id
                        ][dayId][timeId].filter(
                            (allotedNode) => allotedNode.semGrp.id !== semGrp.id
                        );
                    });
                    return pre;
                });

                // extralessons list change
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
            setGeneratedTimeTable((pre) => {
                selectedLesson.semester_groups.forEach((grp) => {
                    let semId = grp.semester.id;
                    if (!(semId in pre)) pre[semId] = {};
                    if (!(dayId in pre[semId])) pre[semId][dayId] = {};
                    if (!(timeId in pre[semId][dayId]))
                        pre[semId][dayId][timeId] = [];
                    let slot = new AllotedSlotNode(selectedLesson, 0, grp);
                    pre[semId][dayId][timeId].push(slot);
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

    useEffect(() => {
        const getLessons = async () => {
            const resp = await axios.get(LESSON_URL);
            const data = resp.data.data;
            return data;
        };
        getLessons().then((data) => {
            let lsns = data.map((lsn) => new LessonNode(lsn));
            setLessons(lsns);

            let classObj = new GeneratorClass(timeSlots, days, data);

            let localData = localStorage.getItem("localData");
            let localExtra = localStorage.getItem("extraLessons");

            if (localData === null || localExtra === null) {
                classObj.generateTimeTable();
            } else {
                classObj.assignSavedData(
                    JSON.parse(localData),
                    JSON.parse(localExtra)
                );
            }
            setExtraLessons(classObj.lessonNotAssigned);
            setGeneratedTimeTable(classObj.data.generateFormattedData());
            setClassObj(classObj);
        });
    }, [axios, timeSlots, days]);

    const handleSave = () => {
        localStorage.setItem("localData", JSON.stringify(classObj.data));
        localStorage.setItem("extraLessons", JSON.stringify(extraLessons));
    };

    return (
        <Grid container padding={"10px"} gap={"10px"}>
            <Grid item xs={12}>
                <Button onClick={handleGenerate}>Generate</Button>
                <Button onClick={handleSave}>Save</Button>
                <DownloadPDFButton />
            </Grid>
            <Grid item xs={12} sx={{ overflow: "scroll", height: "75vh" }}>
                <Table
                    sx={{
                        tableLayout: "fixed",
                        width: "2500px",
                    }}
                    id={"pdf-content"}
                >
                    <TableHead>
                        <TableRow>
                            <Cell />
                            {days.map((day) => (
                                <Cell key={day.id} colSpan={timeSlots.length}>
                                    <HeaderDiv>{day.name}</HeaderDiv>
                                </Cell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <Cell />
                            {days.map(() =>
                                timeSlots.map((timeslot) => (
                                    <Cell key={timeslot.id}>
                                        <HeaderDiv>
                                            <span
                                                style={{
                                                    margin: "0",
                                                    display: "block",
                                                }}
                                            >
                                                {timeslot.start_time.substr(
                                                    0,
                                                    5
                                                )}
                                            </span>
                                            <span style={{ margin: "0" }}>
                                                {timeslot.end_time.substr(0, 5)}
                                            </span>
                                        </HeaderDiv>
                                    </Cell>
                                ))
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {semesters.map((sem) => (
                            <TableRow key={sem.id}>
                                <Cell>
                                    <HeaderDiv>{sem.name}</HeaderDiv>
                                </Cell>
                                {days.map((day) =>
                                    timeSlots.map((timeslot) => (
                                        <DataCell
                                            key={timeslot.id}
                                            day={day}
                                            generatedTimeTable={
                                                generatedTimeTable
                                            }
                                            sem={sem}
                                            timeslot={timeslot}
                                            handleDaD={handleDaD}
                                        />
                                    ))
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={12}>
                <Grid container gap={"10px"}>
                    {extraLessons.map((lsn) => {
                        lsn.colSpan = lsn.lesson_length;
                        return (
                            <Badge
                                key={lsn.id}
                                badgeContent={lsn.lesson_per_week}
                                color="primary"
                            >
                                <span
                                    style={
                                        selectedLesson &&
                                        selectedLesson.id === lsn.id
                                            ? {
                                                  border: "5px solid darkblue",
                                              }
                                            : {}
                                    }
                                >
                                    <ContentWrapper
                                        bgColor={lsn.teachers[0].color}
                                        height="auto"
                                        width={`${lsn.colSpan * 50}px`}
                                        data={lsn}
                                        info={null}
                                        handleDaD={handleDaD}
                                    />
                                </span>
                            </Badge>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Generate;
