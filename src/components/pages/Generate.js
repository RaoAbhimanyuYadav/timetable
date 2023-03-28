import {
    Box,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LESSON_URL } from "../constants/lessonConstant";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AllotedSlotNode, GeneratorClass } from "../utils/classes";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const Cell = ({ children, colSpan }) => {
    return (
        <TableCell
            colSpan={colSpan ? colSpan : 1}
            sx={{
                textAlign: "center",
                border: "1px solid black",
                height: "100px",
                padding: "0",
            }}
        >
            {children}
        </TableCell>
    );
};

const HeaderDiv = ({ children }) => {
    return <Box sx={{ padding: "5px" }}>{children}</Box>;
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
                {subject}
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                {room}
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                {teachers.map(
                    (t, i) =>
                        `${t.code}${i + 1 === teachers.length ? "" : ", "}`
                )}
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

const ContentWrapper = ({
    data,
    info,
    widthIn,
    bgColor,
    height,
    handleDaD,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: bgColor,
                height,
                maxWidth: `${data.colSpan * 100}${widthIn} !important`,
                width: `${data.colSpan * 100}${widthIn} !important`,
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
                        widthIn={"%"}
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
            {slotData ? (
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

// TODO: save generated timetable, fetch

const Generate = () => {
    const axios = useAxiosPrivate();

    const [classObj, setClassObj] = useState(undefined);
    const [generatedTimeTable, setGeneratedTimeTable] = useState([]);
    const [lessons, setLessons] = useState(undefined);
    const [extraLessons, setExtraLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(undefined);

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);
    const semesters = useSelector((state) => state.semester.semesterList);

    const getLessons = async () => {
        const resp = await axios.get(LESSON_URL);
        const data = resp.data.data;
        return data;
    };

    const handleGenerate = () => {
        if (!lessons) {
            getLessons().then((data) => {
                setLessons(data);
                let classObj = new GeneratorClass(timeSlots, days, data);
                classObj.generateTimeTable();
                setExtraLessons(classObj.lessonNotAssigned);
                setClassObj(classObj);
                setGeneratedTimeTable(classObj.data.generateFormattedData());
                console.log(classObj);
            });
        } else {
            classObj.generateTimeTable();
            setExtraLessons(classObj.lessonNotAssigned);
            setGeneratedTimeTable(classObj.data.generateFormattedData());
            console.log(classObj);
        }
    };

    const handleDaD = (info, data, method) => {
        if (method === "cut") {
            // console.log(data);

            let lsn = lessons.find((lsn) => lsn.id === data.id);
            lsn["lesson_per_week"] = 1;
            setSelectedLesson(lsn);

            if (info) {
                // TODO: add to not allotedlist & highlight selected lesson
                let dayId = info.day.id;
                let timeId = info.time.id;
                let tt = { ...generatedTimeTable };
                lsn.semester_group.forEach((semGrp) => {
                    let semId = semGrp.semester.id;
                    let i = generatedTimeTable[semId][dayId][timeId].findIndex(
                        (allotedNode) => allotedNode.semGrp.id === semGrp.id
                    );
                    let size = generatedTimeTable[semId][dayId][timeId].length;
                    if (size === 1) {
                        delete tt[semId][dayId][timeId];
                    } else {
                        tt[semId][dayId][timeId].splice(i, 1);
                    }
                });
                setGeneratedTimeTable(tt);
            } else {
                // TODO: slot is a present in not alloted so just highlight it
            }
        } else if (method === "paste" && selectedLesson) {
            // TODO: check for the slot availability & if available decrease lesson_per_week if 0 the remove
            let dayId = info.day.id;
            let timeId = info.time.id;
            // already alloted type slot
            if (Array.isArray(selectedLesson.semester_groups)) {
                selectedLesson.semester_groups.forEach((grp) => {
                    let semId = grp.semester.id;
                    setGeneratedTimeTable((pre) => {
                        let newData = { ...pre };
                        if (!(semId in newData)) newData[semId] = {};
                        if (!(dayId in newData[semId]))
                            newData[semId][dayId] = {};
                        if (!(timeId in newData[semId][dayId]))
                            newData[semId][dayId][timeId] = [];
                        let slot = new AllotedSlotNode(selectedLesson, 0, grp);
                        newData[semId][dayId][timeId].push(slot);
                        return newData;
                    });
                });
            } else {
                let semId = selectedLesson.semester.id;
                setGeneratedTimeTable((pre) => {
                    let newData = { ...pre };
                    if (!(semId in newData)) newData[semId] = {};
                    if (!(dayId in newData[semId])) newData[semId][dayId] = {};
                    if (!(timeId in newData[semId][dayId]))
                        newData[semId][dayId][timeId] = [];
                    newData[semId][dayId][timeId].push(selectedLesson);
                    return newData;
                });
            }
            // setSelectedLesson(undefined)
        }
    };

    return (
        <Box sx={{ margin: "50px", overflow: "scroll" }}>
            <Button onClick={handleGenerate}>Generate</Button>
            <Grid container>
                <Grid item xs={1}>
                    <Grid container gap={"10px"}>
                        {extraLessons.map((lsn) => (
                            <ContentWrapper
                                key={lsn.id}
                                bgColor={lsn.teachers[0].color}
                                height="auto"
                                widthIn={"px"}
                                data={lsn}
                                info={null}
                                handleDaD={handleDaD}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <Table sx={{ tableLayout: "fixed", width: "5000px" }}>
                        <TableHead>
                            <TableRow>
                                <Cell />
                                {days.map((day) => (
                                    <Cell
                                        key={day.id}
                                        colSpan={timeSlots.length}
                                    >
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
                                                <p style={{ margin: "0" }}>
                                                    {timeslot.start_time.substr(
                                                        0,
                                                        5
                                                    )}
                                                </p>
                                                <p style={{ margin: "0" }}>
                                                    {timeslot.end_time.substr(
                                                        0,
                                                        5
                                                    )}
                                                </p>
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
            </Grid>
        </Box>
    );
};

export default Generate;
