import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    setAllLessonsReducer,
    setExtraLessonsReducer,
    setGenratedTimetableReducer,
} from "../redux/reducers/timetableReducer";
import { CustomButton } from "../utils/customComponents";
import { LESSON_URL } from "../constants/lessonConstant";
import { GeneratorClass, LessonNode } from "../utils/classes";

const serializer = (data) => {
    return JSON.parse(JSON.stringify(data));
};

const GetSavedData = ({ setClassObj }) => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    const getLessons = async () => {
        const resp = await axios.get(LESSON_URL);
        const data = resp.data.data;
        return data;
    };

    const handleGetSaved = () => {
        let localData = localStorage.getItem("localData");
        let localExtra = localStorage.getItem("extraLessons");
        getLessons().then((data) => {
            let classObj = new GeneratorClass(timeSlots, days, data);
            let lsns = data.map((lsn) => new LessonNode(lsn));
            dispatch(setAllLessonsReducer(serializer(lsns)));

            if (localData === null || localExtra === null) {
                classObj.generateTimeTable();
            } else
                classObj.assignSavedData(
                    JSON.parse(localData),
                    JSON.parse(localExtra)
                );
            dispatch(
                setExtraLessonsReducer(serializer(classObj.lessonNotAssigned))
            );
            dispatch(
                setGenratedTimetableReducer(
                    serializer(classObj.data.generateFormattedData())
                )
            );
            setClassObj(classObj);
        });
    };
    return (
        <CustomButton onClick={handleGetSaved}>Get Saved State</CustomButton>
    );
};

export default GetSavedData;
