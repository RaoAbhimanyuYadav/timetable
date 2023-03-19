import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLessonAssignment } from "../redux/actionThunk/betweenSliceThunk";
import {
    resetLessonAssignmentReducer,
    setLessonAssignmentReducer,
} from "../redux/reducers/lessonReducer";

import { CustomMenuItem, CustomTextField } from "../utils/customComponents";

const AysncSelect = ({ formData, obj }) => {
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
    }, [formData, dispatch, obj]);

    const handleChange = (e, i) => {
        const data = [...val];
        data[i] = { id: e.target.value };
        dispatch(setLessonAssignment(data, obj.key));
    };

    return val.map((d, i) => {
        return (
            <CustomTextField
                key={`${d.id} ${i}`}
                select
                id={d.id}
                defaultValue={d.id}
                onChange={(e) => {
                    handleChange(e, i);
                }}
            >
                {(obj.key === "semester_group" ? data[i] || [] : data).map(
                    (option) => (
                        <CustomMenuItem key={option.id} value={option.id}>
                            {option.name}({option.code})
                        </CustomMenuItem>
                    )
                )}
            </CustomTextField>
        );
    });
};

export default AysncSelect;
