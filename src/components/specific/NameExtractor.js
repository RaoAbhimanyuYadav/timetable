import { Box } from "@mui/material";
import LessonAssignButton from "./LessonAssignButton";
import TimeOffRender from "./TimeOffRender";

const NameExtractor = ({ objKey, obj }) => {
    if (objKey.includes("_button")) {
        return <LessonAssignButton teacher={obj} />;
    }
    if (objKey.includes("_group_set")) {
        return obj[objKey].map((ele) => (
            <span key={ele.id}>{`${ele.name}(${ele.code})`}</span>
        ));
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
            if (objKey.includes("_time_off_set")) {
                return <TimeOffRender data={obj[objKey]} />;
            } else if (objKey.includes("semesters")) {
                return obj[objKey].map((ele) => (
                    <span key={ele.id}>{`${ele.name}(${ele.code})`}</span>
                ));
            }
        } else {
            return `${obj[objKey].name}(${obj[objKey].code})`;
        }
    }
};

export default NameExtractor;
