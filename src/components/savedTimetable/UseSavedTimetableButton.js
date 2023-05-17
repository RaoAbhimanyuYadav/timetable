import { CustomButton } from "../utils/customComponents";
import { useDispatch } from "react-redux";
import { setSelectedSavedTimetableIdReducer } from "../redux/reducers/savedTimetableReducer";

const UseSavedTimetableButton = ({ data }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelectedSavedTimetableIdReducer(data.id));
    };

    return <CustomButton onClick={handleClick}>Use</CustomButton>;
};

export default UseSavedTimetableButton;
