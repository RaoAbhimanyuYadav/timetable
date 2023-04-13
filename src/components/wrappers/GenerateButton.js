import { CustomButton } from "../utils/customComponents";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LESSON_URL } from "../constants/lessonConstant";
import { useSelector } from "react-redux";

import { GeneratorClass, LessonNode } from "../utils/classes";

const GenerateButton = ({
    setClassObj,
    setAllLessons,
    setExtraLessons,
    setGeneratedTimetable,
    creatorFunc,
}) => {
    const axios = useAxiosPrivate();

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    const handleGenerate = () => {
        // TODO: Randomize generation
        const getLessons = async () => {
            const resp = await axios.get(LESSON_URL);
            const data = resp.data.data;
            return data;
        };
        getLessons().then((data) => {
            let lsns = data.map((lsn) => new LessonNode(lsn));
            setAllLessons(lsns);

            let classObj = new GeneratorClass(timeSlots, days, data);

            classObj.generateTimeTable();

            setExtraLessons(classObj.lessonNotAssigned);

            setGeneratedTimetable(creatorFunc(classObj));

            setClassObj(classObj);
        });
    };

    return <CustomButton onClick={handleGenerate}>Generate</CustomButton>;
};

export default GenerateButton;
