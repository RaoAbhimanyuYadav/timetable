import { AllotedLessons, LessonClass } from "./classes";

export const generateTimeTable = (timings, days, teachers) => {
    const lessonsData = new LessonClass();
    lessonsData.insertLessons(teachers);
    console.log("Lessons are: ", lessonsData.lessons);

    const data = new AllotedLessons(timings);

    lessonsData.lessons.every((lsn) => {
        while (lsn.lesson_per_week > 0) {
            // Search for the day
            let dayIndex;
            for (dayIndex = 0; dayIndex < days.length; dayIndex++) {
                if (data.isDayAvailableForLesson(lsn, days[dayIndex])) break;
            }
            // days are filled
            if (dayIndex >= days.length) {
                console.log("No Day Available");
                break;
            }
            // Day is available ##########
            // Search for the Slot
            let timeIndex;
            for (timeIndex = 0; timeIndex < timings.length; timeIndex++) {
                if (
                    data.isTimeAvailableForSemster(
                        days[dayIndex],
                        lsn,
                        timings[timeIndex]
                    )
                )
                    break;
            }
            // time filled
            if (timeIndex === timings.length) {
                console.log("No Time Slot Available");
                break;
            }

            // Slot available ###########
            // Assign Lecture
            data.assignLecture(days[dayIndex], timings[timeIndex], lsn);

            // lecture Assigned
            lsn.lesson_per_week--;
        }

        return true;
    });

    console.log(data);

    let finalData = {};
    // Data manipuation for rendering
    data.days.forEach((d) => {
        let day = d.day;
        d.timings.forEach((t) => {
            let time = t.time;
            t.semesterList.forEach((data) => {
                let semester = data.semester;
                if (data.visibility === 1) {
                    if (finalData[semester.id] === undefined)
                        finalData[semester.id] = {};
                    if (finalData[semester.id][day.id] === undefined)
                        finalData[semester.id][day.id] = {};
                    if (finalData[semester.id][day.id][time.id] === undefined)
                        finalData[semester.id][day.id][time.id] = [];

                    finalData[semester.id][day.id][time.id] = [
                        ...finalData[semester.id][day.id][time.id],
                        data,
                    ];
                }
            });
        });
    });

    return finalData;
};
