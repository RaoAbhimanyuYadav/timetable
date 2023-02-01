import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
} from "@mui/material";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToSelectedSemester } from "../redux/actionThunk/betweenSliceThunk";
import {
    removeFromSelectedSemesterReducer,
    resetSelectedSemesterReducer,
    setSelectedSemesterReducer,
} from "../redux/reducers/semesterReducer";

const CheckBoxes = ({ formData, obj }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (formData) {
            dispatch(setSelectedSemesterReducer(formData.semesters));
        }
        return () => {
            dispatch(resetSelectedSemesterReducer());
        };
    }, [dispatch, formData]);

    const semesterData =
        useSelector((state) => state.semester.semesterList) || [];
    const selectedSemesterData =
        useSelector((state) => state.semester.selectedSemesters) || [];

    const handleChange = (e) => {
        if (e.target.checked) {
            dispatch(addToSelectedSemester(e.target.value));
        } else {
            dispatch(removeFromSelectedSemesterReducer(e.target.value));
        }
    };

    const handleChecked = (id) => {
        const index = selectedSemesterData.findIndex((sem) => sem.id === id);
        if (index === -1) return false;
        return true;
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Semesters</FormLabel>
            <FormGroup aria-label="position" row>
                {semesterData.map((sem) => (
                    <FormControlLabel
                        key={sem.id}
                        value={sem.id}
                        control={<Checkbox />}
                        label={`${sem.name}(${sem.code})`}
                        labelPlacement="end"
                        onChange={handleChange}
                        checked={handleChecked(sem.id)}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

export default CheckBoxes;
