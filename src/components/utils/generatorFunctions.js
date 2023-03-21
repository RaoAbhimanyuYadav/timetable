import { AllotedLessons, LessonClass } from "./classes";

export const generateTimeTable = (timings, days, lessons) => {
    const lessonsData = new LessonClass(lessons);
    console.log("Lessons are:  ", lessonsData);
    const data = new AllotedLessons(timings);

    for (let i = 0; i < lessonsData.lectures.length; i++) {
        let lsn = lessonsData.lectures[i];
        while (lsn.lesson_per_week > 0) {
            // search for the day
            let dayIndex;
            for (dayIndex = 0; dayIndex < days.length; dayIndex++) {
                if (data.isDayAvailableForLesson(lsn, days[dayIndex])) break;
            }
            // days are filled
            if (dayIndex >= days.length) {
                // Try to use bruteforce i.e. find index of time without checking day is available or not
                // TODO: implement all time check without checking day
                console.log("No Day Available");
                break;
            }

            let day = days[dayIndex];
            // Day is available ##########
            // Search for the Time Slot
            let timeIndex;
            for (timeIndex = 0; timeIndex < timings.length; timeIndex++) {
                let time = timings[timeIndex];
                // Check time off for this timing
                if (lsn.time_off[day.id] && lsn.time_off[day.id][time.id])
                    continue;
                if (data.isTimeAvailableForSemster(day, lsn, time)) break;
            }
            // time filled
            if (timeIndex === timings.length) {
                // Go to check for other day
                // TODO: Implement check for other day loop
                //No day && No time => we can't do more about push data to exception
                // TODO: implement exception array
                console.log("No Time Slot Available");
                break;
            }

            let time = timings[timeIndex];
            //  Slot available ###########
            // Assign Lecture
            data.assignLecture(day, time, lsn);

            // lecture Assigned
            lsn.lesson_per_week--;
        }
    }

    console.log("Assigned List ", data);

    let finalData = {};
    // Data manipuation for rendering
    data.days.forEach((d) => {
        let day = d.day;
        d.timings.forEach((t) => {
            let time = t.time;
            t.grpList.forEach((semGrp) => {
                let sem = semGrp.semester;
                if (semGrp.hideUI === 0) {
                    if (!(sem.id in finalData)) finalData[sem.id] = {};
                    if (!(day.id in finalData[sem.id]))
                        finalData[sem.id][day.id] = {};
                    if (!(time.id in finalData[sem.id][day.id]))
                        finalData[sem.id][day.id][time.id] = [];

                    finalData[sem.id][day.id][time.id].push(semGrp);
                }
            });
        });
    });

    console.log(finalData);

    return finalData;
};
