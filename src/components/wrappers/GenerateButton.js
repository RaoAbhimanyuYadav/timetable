import { CustomButton } from "../utils/customComponents";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LESSON_URL } from "../constants/lessonConstant";
import { useSelector } from "react-redux";

import { GeneratorClass } from "../utils/classes";
import { Grid } from "@mui/material";

const GenerateButton = ({
    setClassObj,
    setGeneratedTimetable,
    creatorFunc,
    setLoading,
}) => {
    const axios = useAxiosPrivate();

    const timeSlots = useSelector((state) => state.profile.bellTimings);
    const days = useSelector((state) => state.profile.workingDays);

    const handleGenerate = (random) => {
        setLoading(true);
        const getLessons = async () => {
            const resp = await axios.get(LESSON_URL);
            const data = resp.data.data;
            return data;
        };
        getLessons().then((data) => {
            let classObj = new GeneratorClass(timeSlots, days, data);
            if (random) classObj.generateRandomTimetable();
            else classObj.generateTimeTable();

            setGeneratedTimetable(creatorFunc(classObj));

            setClassObj(classObj);
        });
    };

    return (
        <>
            <Grid item>
                <CustomButton onClick={() => handleGenerate(0)}>
                    Generate
                </CustomButton>
            </Grid>
            <Grid item>
                <CustomButton onClick={() => handleGenerate(1)}>
                    Generate Randomly
                </CustomButton>
            </Grid>
        </>
    );
};

export default GenerateButton;
