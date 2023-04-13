import { TableBody, TableRow } from "@mui/material";
import CellDataSelector from "./CellDataSelector";
import CellWrapper from "./CellWrapper";
import { useSelector } from "react-redux";
import HeaderWrapper from "./HeaderWrapper";

const TimetableBody = ({ viewSelectorFunc, handleDaD, generatedTimetable }) => {
    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);
    const data = useSelector(viewSelectorFunc);

    return (
        <TableBody>
            {data.map((d) => (
                <TableRow key={d.id}>
                    <CellWrapper padding={"5px"}>
                        <HeaderWrapper>{d.name}</HeaderWrapper>
                    </CellWrapper>
                    {days.map((day) =>
                        timeSlots.map((timeslot) => (
                            <CellDataSelector
                                key={timeslot.id}
                                day={day}
                                generatedTimeTable={generatedTimetable}
                                data={d}
                                timeslot={timeslot}
                                handleDaD={handleDaD}
                            />
                        ))
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TimetableBody;
