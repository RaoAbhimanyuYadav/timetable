import { useEffect, useState } from "react";
import TableLayout from "../common/TableLayout";
import {
    SAVED_TIMETABLE_TABLE_BODY_KEY,
    SAVED_TIMETABLE_TABLE_HEADING,
    SAVED_TIMETABLE_URL,
} from "../constants/savedTimtableConstants";
import { useDispatch } from "react-redux";
import { deleteData, getData } from "../redux/actionThunk/apiThunk";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { setSavedTimetableReducer } from "../redux/reducers/savedTimetableReducer";
import LoadingSpinner from "../specific/LoadingSpinner";

const SavedTimetableUI = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const [loading, setLoading] = useState(true);

    const deleteHandler = (data) => {
        // delete doc
        dispatch(
            deleteData(
                axios,
                SAVED_TIMETABLE_URL,
                setSavedTimetableReducer,
                data.id
            )
        );
    };

    useEffect(() => {
        dispatch(
            getData(
                axios,
                SAVED_TIMETABLE_URL,
                setSavedTimetableReducer,
                setLoading
            )
        ); // eslint-disable-next-line
    }, []);

    return loading ? (
        <LoadingSpinner open={loading} />
    ) : (
        <TableLayout
            tableHeadings={SAVED_TIMETABLE_TABLE_HEADING}
            tableBodykey={SAVED_TIMETABLE_TABLE_BODY_KEY}
            selectorFunc={(state) => state.savedTimetable.savedList}
            deleteHandler={deleteHandler}
            formFields={[]}
            formSubmitHandler={() => {}}
            enableEdit={false}
        />
    );
};

export default SavedTimetableUI;
