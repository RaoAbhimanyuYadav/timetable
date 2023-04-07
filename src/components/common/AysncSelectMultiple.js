import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setLessonAssignment,
    updateInLessonAssignment,
} from "../redux/actionThunk/betweenSliceThunk";
import {
    addToLessonAssignmentReducer,
    deleteFromLessonAssignmentReducer,
    resetLessonAssignmentReducer,
    setLessonAssignmentReducer,
} from "../redux/reducers/lessonReducer";

import {
    CustomButton,
    CustomMenuItem,
    CustomTextField,
} from "../utils/customComponents";

const AysncSelectMultiple = ({ formData, obj }) => {
    const dispatch = useDispatch();

    const data = useSelector(obj.selectorFunc) || [];

    const val = useSelector((state) => state.lesson[obj.key]);
    const tId = useSelector((state) => state.lesson.teacherId);

    useEffect(() => {
        if (formData) {
            dispatch(setLessonAssignment(formData[obj.key], obj.key));
        } else if (obj.key === "teacher") {
            dispatch(
                setLessonAssignmentReducer({
                    key: "teacher",
                    id: [{ id: tId }],
                })
            );
        }
        return () => {
            dispatch(
                resetLessonAssignmentReducer({
                    key: obj.key,
                    value: obj.default,
                })
            );
        };
    }, [formData, dispatch, obj, tId]);

    const handleChange = (e, i) => {
        dispatch(
            updateInLessonAssignment({
                key: obj.key,
                i,
                value: { id: e.target.value },
            })
        );
    };

    const handleAdd = (e) => {
        dispatch(addToLessonAssignmentReducer({ key: obj.key }));
    };

    const handleDelete = (e, i) => {
        dispatch(deleteFromLessonAssignmentReducer({ key: obj.key, i }));
    };

    return (
        <>
            {val.map((d, i) => (
                <Box key={`${d.id} ${i}`} sx={{ display: "flex" }}>
                    <CustomTextField
                        select
                        id={d.id}
                        defaultValue={d.id}
                        onChange={(e) => {
                            handleChange(e, i);
                        }}
                    >
                        {(obj.key === "semester_group"
                            ? data[i] || []
                            : data
                        ).map((option) => (
                            <CustomMenuItem key={option.id} value={option.id}>
                                {option.name}({option.code})
                            </CustomMenuItem>
                        ))}
                    </CustomTextField>
                    {obj.key !== "semester_group" && i !== 0 && (
                        <CustomButton
                            onClick={(e) => {
                                handleDelete(e, i);
                            }}
                        >
                            Delete
                        </CustomButton>
                    )}
                </Box>
            ))}
            {obj.key !== "semester_group" && (
                <CustomButton onClick={handleAdd}>Add</CustomButton>
            )}
        </>
    );
};

export default AysncSelectMultiple;
