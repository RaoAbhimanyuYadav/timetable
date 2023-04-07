import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CustomButton,
    CustomMenuItem,
    CustomTextField,
} from "../utils/customComponents";
import { Box, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const MultipleSelector = ({ formData, obj }) => {
    const dispatch = useDispatch();

    const options = useSelector(obj.selectorFunc) || [];
    const selectedData = useSelector(obj.selectedDataFunc) || [];

    useEffect(() => {
        if (formData) {
            dispatch(obj.setReducer(formData[obj.key]));
        }
        return () => {
            dispatch(obj.resetReducer());
        };
    }, [dispatch, formData, obj]);

    const handleChange = (e, i) => {
        dispatch(obj.updateReducer({ index: i, id: e.target.value }));
    };

    const handleAdd = (e) => {
        dispatch(obj.pushReducer({ id: "" }));
    };

    const handleDelete = (e, i) => {
        dispatch(obj.deleteReducer(i));
    };
    return (
        <>
            <CustomButton onClick={handleAdd}>Add More</CustomButton>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedData.map((data, i) => (
                    <Box key={`${data.id} ${i}`}>
                        <CustomTextField
                            select
                            id={data.id}
                            defaultValue={data.id}
                            onChange={(e) => {
                                handleChange(e, i);
                            }}
                        >
                            {options.map((option) => (
                                <CustomMenuItem
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.name}({option.code})
                                </CustomMenuItem>
                            ))}
                        </CustomTextField>
                        {i !== 0 && (
                            <IconButton
                                onClick={(e) => {
                                    handleDelete(e, i);
                                }}
                            >
                                <DeleteForeverIcon sx={{ color: "red" }} />
                            </IconButton>
                        )}
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default MultipleSelector;
