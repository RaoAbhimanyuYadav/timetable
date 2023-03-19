import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLessonAssignment } from "../redux/actionThunk/betweenSliceThunk";
import { resetLessonAssignmentReducer } from "../redux/reducers/lessonReducer";
import { CustomMenuItem, CustomTextField } from "./customComponents";

const AysncSelect = ({ formData, obj }) => {
    const dispatch = useDispatch();

    const data = useSelector(obj.selectorFunc) || [];

    const val = useSelector((state) => state.lesson[obj.key]);

    useEffect(() => {
        if (formData) {
            dispatch(setLessonAssignment(formData[obj.key].id, obj.key));
        }
        return () => {
            dispatch(
                resetLessonAssignmentReducer({
                    key: obj.key,
                    value: "",
                })
            );
        };
    }, [formData, dispatch, obj]);

    return (
        <CustomTextField
            select
            id={obj.key}
            name={obj.key}
            defaultValue={formData ? formData[obj.key].id : obj.default}
            onChange={(e) => {
                dispatch(setLessonAssignment(e.target.value, obj.key));
            }}
            value={val}
        >
            {data.map((option) => (
                <CustomMenuItem key={option.id} value={option.id}>
                    {option.name}({option.code})
                </CustomMenuItem>
            ))}
        </CustomTextField>
    );
};

export default AysncSelect;
