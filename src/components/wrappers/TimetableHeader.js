import { TableHead, TableRow } from "@mui/material";
import CellWrapper from "./CellWrapper";
import { useSelector } from "react-redux";
import HeaderWrapper from "./HeaderWrapper";

const TimetableHeader = () => {
    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    return (
        <TableHead>
            <TableRow>
                <CellWrapper />
                {days.map((day) => (
                    <CellWrapper
                        key={day.id}
                        colSpan={timeSlots.length}
                        padding={"5px"}
                    >
                        <HeaderWrapper>{day.name}</HeaderWrapper>
                    </CellWrapper>
                ))}
            </TableRow>
            <TableRow>
                <CellWrapper />
                {days.map(() =>
                    timeSlots.map((timeslot) => (
                        <CellWrapper key={timeslot.id}>
                            <HeaderWrapper>
                                <span
                                    style={{
                                        margin: "0",
                                        display: "block",
                                    }}
                                >
                                    {timeslot.start_time.substr(0, 5)}
                                </span>
                                <span style={{ margin: "0" }}>
                                    {timeslot.end_time.substr(0, 5)}
                                </span>
                            </HeaderWrapper>
                        </CellWrapper>
                    ))
                )}
            </TableRow>
        </TableHead>
    );
};

export default TimetableHeader;
