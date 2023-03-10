import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { generateTimeTable } from "../utils/generatorFunctions";

const Cell = ({ children, colSpan }) => {
    return (
        <TableCell
            colSpan={colSpan ? colSpan : 1}
            sx={{
                textAlign: "center",
                border: "1px solid black",
                height: "40px",
                padding: "0",
            }}
        >
            {children}
        </TableCell>
    );
};

const ContentDiv = ({ subject, teacher, room }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                {subject}
            </Grid>
            <Grid item xs={6}>
                {room}
            </Grid>
            <Grid item xs={6}>
                {teacher}
            </Grid>
        </Grid>
    );
};

const HeaderDiv = ({ children }) => {
    return <Box sx={{ padding: "5px" }}>{children}</Box>;
};

const LectureDiv = ({ data }) => {
    return <Box>{data.subject}</Box>;
};
const GroupContent = ({ data }) => {
    if (!data) return <Grid item xs={12}></Grid>;
    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: data.backgroundColor,
            }}
        >
            <ContentDiv
                room={data.room}
                subject={data.subject}
                teacher={data.teacher}
            />
        </Grid>
    );
};
const LabDiv = ({ data }) => {
    return (
        <Grid
            container
            sx={{ display: "grid" }}
            gridTemplateRows="repeat(2, 1fr)"
        >
            <GroupContent data={data.groups["G1"]} />
            <GroupContent data={data.groups["G2"]} />
        </Grid>
    );
};

const EmptyDiv = () => {
    return <></>;
};

const DataDiv = ({ data }) => {
    if (data.colSpan > 1) return <LabDiv data={data} />;
    return <LectureDiv data={data} />;
};

const DataCell = ({ generatedTimeTable, sem, day, timeslot }) => {
    const data =
        generatedTimeTable[sem.id] && generatedTimeTable[sem.id][day.id]
            ? generatedTimeTable[sem.id][day.id][timeslot.id]
            : undefined;

    return (
        <Cell colSpan={data?.colSpan}>
            {data ? <DataDiv data={data} /> : <EmptyDiv />}
        </Cell>
    );
};

const Generate = () => {
    const [lessons, setLessons] = useState([]);
    const [days, setDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [generatedTimeTable, setGeneratedTimeTable] = useState({
        "315f4199-18fe-4fd5-aa01-35d6b84ca8e8": {
            "0ecd900f-0077-43ec-83b0-545619b653bb": {
                "150cac9c-684f-4337-ae79-d6a65d57ba0d": {
                    isGrouped: true,
                    groups: {
                        G1: {
                            subject: "Ec-101",
                            teacher: "SKU",
                            room: "F1",

                            backgroundColor: "#f1f121",
                        },
                    },
                    colSpan: 2,
                    height: "25px",
                    totalGroups: 2,
                },
            },
        },
    });

    const teacherData = useSelector((state) => state.teacher.teacherList);
    const bellTimings = useSelector((state) => state.profile.bellTimings);
    const workingDays = useSelector((state) => state.profile.workingDays);
    const semesterData = useSelector((state) => state.semester.semesterList);
    const classroomData = useSelector((state) => state.semester.classroomList);
    const subjectData = useSelector((state) => state.semester.subjectList);

    useEffect(() => {
        let lessonData = [];
        teacherData.forEach((t) => {
            let teacher = {
                id: t.id,
                name: t.name,
                code: t.code,
                color: t.color,
                teacher_time_off_set: t.teacher_time_off_set,
            };
            t.lesson_set.forEach((l) => {
                let lesson = { ...l, teacher };
                lessonData.push(lesson);
            });
        });
        setLessons(lessonData);
        setTimeSlots(bellTimings);
        setDays(workingDays);
        setSemesters(semesterData);
    }, [teacherData, bellTimings, workingDays, semesterData]);
    useEffect(() => {
        generateTimeTable(
            bellTimings,
            workingDays,
            teacherData,
            semesterData,
            classroomData,
            subjectData
        );
    }, []);

    return (
        <Box sx={{ margin: "50px", overflow: "scroll" }}>
            <Table>
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
                                        <p style={{ margin: "0" }}>
                                            {timeslot.start_time.substr(0, 5)}
                                        </p>
                                        <p style={{ margin: "0" }}>
                                            {timeslot.end_time.substr(0, 5)}
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
                                        generatedTimeTable={generatedTimeTable}
                                        sem={sem}
                                        timeslot={timeslot}
                                    />
                                ))
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Generate;
