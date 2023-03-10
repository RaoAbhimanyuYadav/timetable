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

const Content = ({ subject, teacher, room }) => {
    return (
        <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12} sx={gridItemCSS}>
                {subject}
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                {room}
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                {teacher}
            </Grid>
        </Grid>
    );
};

const ContentWrapper = ({ data }) => {
    if (!data) return <Grid item xs={12}></Grid>;
    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: data.teacher.color,
                height: "100%",
                maxWidth: `${data.colSpan * 100}% !important`,
                width: `${data.colSpan * 100}% !important`,
            }}
        >
            <Content
                room={data.classroom.code}
                subject={data.subject.code}
                teacher={data.teacher.code}
            />
        </Grid>
    );
};
const Lecture = ({ data, rows }) => {
    let newData = [];
    for (let i = 1; i <= rows && rows > 1; i++) {
        let grp = `G${i}`;
        let index = data.findIndex((d) => d.semGroup.code === grp);
        if (index === -1) newData.push(null);
        else newData.push(data[index]);
    }

    return (
        <Grid
            container
            sx={{ display: "grid", height: "100%" }}
            gridTemplateRows={`repeat(${rows}, 1fr)`}
        >
            {(rows > 1 ? newData : data).map((d, i) => (
                <ContentWrapper key={i} data={d} />
            ))}
        </Grid>
    );
};

const EmptyDiv = () => {
    return <></>;
};

const DataDiv = ({ slotData }) => {
    if (slotData[0].isGrouped)
        return <Lecture data={slotData} rows={slotData[0].totalGroups} />;

    return <Lecture data={slotData} rows={1} />;
};

const DataCell = ({ generatedTimeTable, sem, day, timeslot }) => {
    const slotData =
        generatedTimeTable[sem.id] && generatedTimeTable[sem.id][day.id]
            ? generatedTimeTable[sem.id][day.id][timeslot.id]
            : undefined;

    return (
        <Cell>{slotData ? <DataDiv slotData={slotData} /> : <EmptyDiv />}</Cell>
    );
};

const Generate = () => {
    const [days, setDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [generatedTimeTable, setGeneratedTimeTable] = useState();

    const teacherData = useSelector((state) => state.teacher.teacherList);
    const bellTimings = useSelector((state) => state.profile.bellTimings);
    const workingDays = useSelector((state) => state.profile.workingDays);
    const semesterData = useSelector((state) => state.semester.semesterList);

    useEffect(() => {
        setTimeSlots(bellTimings);
        setDays(workingDays);
        setSemesters(semesterData);
        setGeneratedTimeTable(
            generateTimeTable(bellTimings, workingDays, teacherData)
        );
    }, [bellTimings, workingDays, teacherData, semesterData]);

    return (
        <Box sx={{ margin: "50px", overflow: "scroll" }}>
            <Table sx={{ tableLayout: "fixed", width: "5000px" }}>
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
