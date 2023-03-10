import { AllotedLessons, LessonClass, TimeLinkedList } from "./classes";

class Slot {
    constructor(semester) {
        this.classroom = null;
        this.isGrouped = false;
        this.groups = [];
        this.colSpan = 1;
        this.height = "25px";
        this.totalGroups = semester.semester_group_set.length - 1;
    }
}

class TimeObj {
    constructor(time, semester) {
        this[time.id] = new Slot(semester);
        this.teachersAssigned = [];
        this.semesterGroupAssigned = [];
        this.classroomAssigned = [];
    }
}

class DayObj {
    constructor(day, semester, timeList) {
        this[day.id] = this.createTimes(timeList, semester);
        this.subjectAssigned = [];
        this.timeAssigned = [];
    }
    createTimes(timeList, semester) {
        let times = {};
        timeList.forEach((time) => {
            let newTime = new TimeObj(time, semester);
            times = { ...times, ...newTime };
        });
        return times;
    }
}

class SemObj {
    constructor(semester, dayList, timeList) {
        this[semester.id] = this.createDays(dayList, timeList, semester);
    }
    createDays(dayList, timeList, semester) {
        let days = {};
        dayList.forEach((day) => {
            let newDay = new DayObj(day, semester, timeList);
            days = { ...days, ...newDay };
        });
        return days;
    }
}

class TimeTable {
    constructor(semesterList, dayList, timeList) {
        this.data = {};
    }
    createSemesters(semesterList, dayList, timeList) {
        let semesters = {};
        semesterList.forEach((sem) => {
            let semester = new SemObj(sem, dayList, timeList);
            semesters = { ...semesters, ...semester };
        });
        return semesters;
    }
}

export const generateTimeTable = (
    timings,
    days,
    teachers,
    semesters,
    classrooms,
    subjects
) => {
    const lessonsData = new LessonClass();
    lessonsData.insertLessons(teachers);
    console.log("Lessons are: ", lessonsData.lessons);

    const timeLinked = new TimeLinkedList(timings);
    // console.log("Time Linked List is: ", timeLinked.root);

    const timeTable = new TimeTable();
    // console.log("Generated Empty timetable is: ", timeTable.data);

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
};
