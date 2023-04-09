import { useDispatch, useSelector } from "react-redux";
import { CustomMenuItem, CustomTextField } from "../utils/customComponents";
import { useEffect } from "react";

const Select = ({ formData, obj }) => {
    const dispatch = useDispatch();

    const options = useSelector(obj.selectorFunc) || [];
    const selectedData = useSelector(obj.selectedDataFunc) || {};

    useEffect(() => {
        if (formData) {
            dispatch(obj.setReducer(formData[obj.key].id));
        }
        return () => {
            dispatch(obj.setReducer(""));
        };
    }, [formData, dispatch, obj]);

    return (
        <CustomTextField
            select
            id={obj.key}
            name={obj.key}
            defaultValue={formData ? formData[obj.key].id : obj.default}
            onChange={(e) => {
                dispatch(obj.setReducer(e.target.value));
            }}
            value={selectedData.id}
        >
            {options.map((option) => (
                <CustomMenuItem key={option.id} value={option.id}>
                    {option.name}({option.code})
                </CustomMenuItem>
            ))}
        </CustomTextField>
    );
};

export default Select;
