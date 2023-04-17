import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CustomButton } from "../utils/customComponents";
import { LESSON_URL } from "../constants/lessonConstant";
import { GeneratorClass } from "../utils/classes";

const GetSavedData = ({
    setClassObj,
    setGeneratedTimetable,
    creatorFunc,
    setLoading,
}) => {
    const axios = useAxiosPrivate();

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

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
    return (
        <CustomButton onClick={handleGetSaved}>Get Saved State</CustomButton>
    );
};

export default GetSavedData;
