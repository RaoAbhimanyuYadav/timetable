import { Box } from "@mui/material";
import LessonAssignButton from "./LessonAssignButton";
import TimeOffRender from "./TimeOffRender";
import GroupsUI from "./GroupsUI";
import UseSavedTimetableButton from "../savedTimetable/UseSavedTimetableButton";

const NameExtractor = ({ objKey, obj }) => {
    if (objKey.includes("useSavedTimetableButton"))
        return <UseSavedTimetableButton data={obj} />;
    if (objKey.includes("_button")) {
        return <LessonAssignButton teacher={obj} />;
    }
    if (objKey.includes("groups")) {
        return <GroupsUI groups={obj[objKey]} />;
    }
    if (objKey.includes("color")) {
        return (
            <Box
                sx={{
                    backgroundColor: `${obj[objKey]}`,
                    width: "40px",
                    aspectRatio: "2/1",
                }}
            ></Box>
        );
    }
    if (typeof obj[objKey] === "string" || typeof obj[objKey] === "number")
        return obj[objKey];
    if (typeof obj[objKey] === "boolean") return obj[objKey] ? "Yes" : "No";
    if (typeof obj[objKey] === "object") {
        if (Array.isArray(obj[objKey])) {
            if (objKey.includes("time_off")) {
                return <TimeOffRender data={obj[objKey]} />;
            }
            if (objKey === "sem_grps") {
                return obj[objKey].map((semGrp, i) => (
                    <span key={semGrp.semester.id + semGrp.group.id + i}>
                        {semGrp.semester.name}({semGrp.group.code})
                    </span>
                ));
            }
            return obj[objKey].map((ele) => (
                <span key={ele.id}>{`${ele.name}(${ele.code})`}</span>
            ));
        }

        return `${obj[objKey].name}(${obj[objKey].code})`;
    }
};

export default NameExtractor;
