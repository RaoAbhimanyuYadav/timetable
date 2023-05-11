import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CustomButton } from "../utils/customComponents";
import { LESSON_URL } from "../constants/lessonConstant";
import { GeneratorClass } from "../utils/classes";
import { useEffect } from "react";
import { SAVED_TIMETABLE_URL } from "../constants/savedTimtableConstants";

const GetSavedData = ({
    setClassObj,
    setGeneratedTimetable,
    creatorFunc,
    setLoading,
}) => {
    const axios = useAxiosPrivate();

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    const selectedSavedTimetableId = useSelector(
        (state) => state.savedTimetable.selectedSavedTimetableId
    );

    const getLessons = async () => {
        const resp = await axios.get(LESSON_URL);
        const data = resp.data.data;
        return data;
    };

    const handleGetSaved = () => {
        setLoading(true);
        let localData = localStorage.getItem("localData");
        let localExtra = localStorage.getItem("extraLessons");
        getLessons().then((data) => {
            let classObj = new GeneratorClass(timeSlots, days, data);

            if (localData === null || localExtra === null) {
                classObj.generateTimeTable();
            } else
                classObj.assignSavedData(
                    JSON.parse(localData),
                    JSON.parse(localExtra)
                );

            setGeneratedTimetable(creatorFunc(classObj));

            setClassObj(classObj);
        });
    };

    const handleFetchAndUpdate = async () => {
        setLoading(true);
        const resp = await axios.get(SAVED_TIMETABLE_URL, {
            params: { id: selectedSavedTimetableId },
        });
        getLessons().then((data) => {
            let classObj = new GeneratorClass(timeSlots, days, data);
            classObj.assignSavedData(
                resp.data.data.data,
                resp.data.data.extra_lessons
            );

            setGeneratedTimetable(creatorFunc(classObj));

            setClassObj(classObj);
        });
    };

    useEffect(() => {
        if (selectedSavedTimetableId) {
            handleFetchAndUpdate();
        } // eslint-disable-next-line
    }, [selectedSavedTimetableId]);

    return (
        <CustomButton onClick={handleGetSaved}>Get Saved State</CustomButton>
    );
};

export default GetSavedData;
