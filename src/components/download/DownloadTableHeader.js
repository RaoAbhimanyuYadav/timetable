import { useSelector } from "react-redux";
import { TableHead, TableRow } from "@mui/material";
import CellWrapper from "../wrappers/CellWrapper";
import HeaderWrapper from "../wrappers/HeaderWrapper";

const DownloadTableHeader = () => {
    const timeSlots = useSelector((state) => state.profile.bellTimings);
    return (
        <TableHead>
            <TableRow>
                <CellWrapper />
                {timeSlots.map((timeslot) => (
                    <CellWrapper key={timeslot.id} padding={"5px"}>
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
                ))}
            </TableRow>
        </TableHead>
    );
};

export default DownloadTableHeader;
