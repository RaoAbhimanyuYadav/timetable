import { TableBody, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import CellWrapper from "../wrappers/CellWrapper";
import HeaderWrapper from "../wrappers/HeaderWrapper";
import CellDataSelector from "../wrappers/CellDataSelector";

const DownloadTableBody = ({
    generatedTimetable = {},
    handleDaD = () => {},
    data = { id: "" },
}) => {
    const days = useSelector((state) => state.profile.workingDays);
    const timeSlots = useSelector((state) => state.profile.bellTimings);

    return (
        <TableBody>
            {days.map((day) => (
                <TableRow key={day.id}>
                    <CellWrapper padding={"5px"}>
                        <HeaderWrapper>{day.name}</HeaderWrapper>
                    </CellWrapper>
                    {timeSlots.map((timeslot) => (
                        <CellDataSelector
                            key={timeslot.id}
                            day={day}
                            generatedTimeTable={generatedTimetable}
                            data={data} //sem , teacher, room -> {id:___}
                            timeslot={timeslot}
                            handleDaD={handleDaD}
                        />
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default DownloadTableBody;
