import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LESSON_URL } from "../constants/lessonConstant";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
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

const Content = ({ subject, teachers, room }) => {
    return (
        <Grid container sx={{ height: "100%" }}>
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

const ContentWrapper = ({ data }) => {
    if (!data) return <Grid item xs={12}></Grid>;
    return (
        <Grid
            item
            xs={12}
            sx={{
                backgroundColor: data.color,
                height: "100%",
                maxWidth: `${data.colSpan * 100}% !important`,
                width: `${data.colSpan * 100}% !important`,
            }}
        >
            <Content
                room={data.classroom.code}
                subject={data.subject.code}
                teachers={data.teachers}
            />
        </Grid>
    );
};
const Lecture = ({ data, rows }) => {
    let newData = [];
    for (let i = 1; i <= rows && rows > 1; i++) {
        let index = data.findIndex((d) => d.grpNum === i);
        if (index === -1) newData.push(null);
        else newData.push(data[index]);
    }

    console.log(data, newData);

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
    return (
        <Lecture
            data={slotData}
            rows={slotData[0].isGrouped ? slotData[0].totalGroups : 1}
        />
    );
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
    const axios = useAxiosPrivate();

    const [generatedTimeTable, setGeneratedTimeTable] = useState([]);

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);
    const semesters = useSelector((state) => state.semester.semesterList);

    useEffect(() => {
        const getLessons = async () => {
            const resp = await axios.get(LESSON_URL);
            const data = resp.data.data;
            return data;
        };
        getLessons().then((data) => {
            setGeneratedTimeTable(generateTimeTable(timeSlots, days, data));
        }); // eslint-disable-next-line
    }, []);

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
