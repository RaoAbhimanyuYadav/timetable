import { useDispatch, useSelector } from "react-redux";
import {
    LESSON_FORM_FIELDS,
    LESSON_TABLE_BODY_KEY,
    LESSON_TABLE_HEADING,
    LESSON_URL,
} from "../constants/lessonConstant";

import PageWrapper from "../HOC/PageWrapper";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    addData,
    deleteData,
    getData,
    updateData,
} from "../redux/actionThunk/apiThunk";
import {
    addLesson,
    deleteLesson,
    updateLesson,
} from "../redux/actionThunk/betweenSliceThunk";

const LessonAssignment = () => {
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const {
        teacher,
        classroom,
        subject,
        semester,
        semester_group,
        lessonList,
    } = useSelector((state) => state.lesson);

    const formSubmitHandler = (e, data) => {
        const filteredData = {
            teacher: {
                id: teacher,
            },
            classroom: { id: classroom },
            subject: { id: subject },
            semester: { id: semester },
            semester_group: { id: semester_group },
            lesson_per_week: e.target.lesson_per_week.value,
            is_lab: e.target.is_lab.checked,
        };
        if (data) {
            filteredData["id"] = data.id;
            // update
            dispatch(updateData(axios, LESSON_URL, updateLesson, filteredData));
        } else {
            // create
            dispatch(addData(axios, LESSON_URL, addLesson, filteredData));
        }
    };

    const deleteHandler = (data) => {
        dispatch(deleteData(axios, LESSON_URL, deleteLesson, data.id));
    };

    return (
        <PageWrapper
            title={"Lessons"}
            tableBodyData={lessonList || []}
            tableHeadings={LESSON_TABLE_HEADING}
            tableBodykey={LESSON_TABLE_BODY_KEY}
            formFields={LESSON_FORM_FIELDS}
            formSubmitHandler={formSubmitHandler}
            deleteHandler={deleteHandler}
        />
    );
};

export default LessonAssignment;
