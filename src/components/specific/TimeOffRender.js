import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TimeOffRender = ({ data }) => {
    const [timeOffList, setTimeOffList] = useState([]);

    const timings = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    useEffect(() => {
        if (data) setTimeOffList(data);
    }, [data]);

    const isPresent = (day, time) => {
        const index = timeOffList.findIndex(
            (timeOff) =>
                timeOff.bell_timing.id === time.id &&
                timeOff.working_day.id === day.id
        );

        if (index === -1) return false;
        return true;
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {days.map((day) => (
                <Box
                    key={day.id}
                    sx={{ display: "flex", flexDirection: "row", gap: "2px" }}
                >
                    {timings.map((time) => (
                        <Box
                            key={time.id}
                            sx={{
                                height: "10px",
                                width: "10px",
                                backgroundColor: isPresent(day, time)
                                    ? "red"
                                    : "green",
                            }}
                        ></Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

export default TimeOffRender;
