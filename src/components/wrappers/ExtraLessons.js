import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import AllotedLecture from "./AllotedLecture";

const ExtraLessons = ({ handleDaD }) => {
    const extraLessons = useSelector((state) => state.timetable.extraLessons);
    const selectedLesson = useSelector(
        (state) => state.timetable.selectedLesson
    );

    return extraLessons.map((lsn) => {
        return (
            <Badge
                key={lsn.id}
                badgeContent={lsn.lesson_per_week}
                color="primary"
            >
                <span
                    style={{
                        border:
                            selectedLesson && selectedLesson.id === lsn.id
                                ? "5px solid darkblue"
                                : "none",
                    }}
                >
                    <AllotedLecture
                        bgColor={lsn.teachers[0].color}
                        height="auto"
                        width={`${lsn.lesson_length * 50}px`}
                        data={lsn}
                        info={null}
                        handleDaD={handleDaD}
                    />
                </span>
            </Badge>
        );
    });
};

export default ExtraLessons;
