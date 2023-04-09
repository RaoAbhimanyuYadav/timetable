import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    deleteInSelectedSemGrpssReducer,
    pushInSelectedSemGrpsReducer,
    resetSelectedSemGrpsReducer,
    setSelectedSemGrpsReducer,
    updateInSelectedSemGrpsReducer,
} from "../redux/reducers/semesterReducer";

import {
    CustomButton,
    CustomMenuItem,
    CustomTextField,
} from "../utils/customComponents";
import { Grid, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { setSelectedClassroomReducer } from "../redux/reducers/classroomReducers";

const SemGrpSelect = ({ formData, obj }) => {
    const dispatch = useDispatch();
    const semOptions = useSelector((state) => state.semester.semesterList);
    const grpOptions = useSelector((state) => state.groups.groupList);

    const selectedData = useSelector((state) => state.semester.selectedSemGrps);

    useEffect(() => {
        if (formData) {
            dispatch(setSelectedSemGrpsReducer(formData[obj.key]));
        }
        return () => {
            dispatch(resetSelectedSemGrpsReducer());
        };
    }, [formData, dispatch, obj]);

    const handleSemChange = (e, i) => {
        const getSemester = () => async (dispatch, getState) => {
            const data = getState().semester.semesterList.find(
                (sem) => sem.id === e.target.value
            );
            dispatch(
                updateInSelectedSemGrpsReducer({
                    index: i,
                    key: "semester",
                    data,
                })
            );
            if (i === 0) {
                dispatch(setSelectedClassroomReducer(data.classroom.id));
            }
        };
        dispatch(getSemester());
    };
    const handleGrpChange = (e, i) => {
        const getGroup = () => async (dispatch, getState) => {
            const data = getState().groups.groupList.find(
                (grp) => grp.id === e.target.value
            );
            dispatch(
                updateInSelectedSemGrpsReducer({
                    index: i,
                    key: "group",
                    data,
                })
            );
        };
        dispatch(getGroup());
    };

    const handleAdd = (e) => {
        dispatch(pushInSelectedSemGrpsReducer());
    };

    const handleDelete = (e, i) => {
        dispatch(deleteInSelectedSemGrpssReducer(i));
    };

    return (
        <>
            <CustomButton onClick={handleAdd}>Add More</CustomButton>
            <Grid container>
                {selectedData.map((data, i) => (
                    <Grid
                        item
                        xs={12}
                        key={`${data.semester.id} ${data.group.id} ${i}`}
                    >
                        <Grid container>
                            <Grid item xs={3}>
                                <CustomTextField
                                    select
                                    id={data.semester.id}
                                    defaultValue={data.semester.id}
                                    onChange={(e) => {
                                        handleSemChange(e, i);
                                    }}
                                >
                                    {semOptions.map((option) => (
                                        <CustomMenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}({option.code})
                                        </CustomMenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>
                            <Grid item xs={3}>
                                <CustomTextField
                                    select
                                    id={data.group.id}
                                    defaultValue={data.group.id}
                                    onChange={(e) => {
                                        handleGrpChange(e, i);
                                    }}
                                >
                                    {grpOptions.map((option) => (
                                        <CustomMenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}({option.code})
                                        </CustomMenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>
                            <Grid item xs={6}>
                                {i !== 0 && (
                                    <IconButton
                                        onClick={(e) => {
                                            handleDelete(e, i);
                                        }}
                                    >
                                        <DeleteForeverIcon
                                            sx={{ color: "red" }}
                                        />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default SemGrpSelect;
