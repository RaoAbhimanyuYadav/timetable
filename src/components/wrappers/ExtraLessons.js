import { Badge, Tooltip } from "@mui/material";
import AllotedLecture from "./AllotedLecture";

const ExtraLessons = ({ handleDaD, extraLessons, selectedLesson }) => {
    return extraLessons.map((lsn) => {
        return (
            <Badge
                key={lsn.id}
                badgeContent={lsn.lesson_per_week}
                color="primary"
            >
                <Tooltip
                    title={lsn?.total_time_off}
                    componentsProps={{
                        tooltip: { sx: { backgroundColor: "red" } },
                    }}
                >
                    <span
                        style={{
                            border:
                                selectedLesson && selectedLesson.id === lsn.id
                                    ? "5px solid darkblue"
                                    : "5px solid white",
                        }}
                    >
                        <AllotedLecture
                            bgColor={lsn.teachers[0].color}
                            height="100%"
                            width={`${lsn.lesson_length * 50}px`}
                            data={lsn}
                            info={null}
                            handleDaD={handleDaD}
                        />
                    </span>
                </Tooltip>
            </Badge>
        );
    });
};

export default ExtraLessons;
