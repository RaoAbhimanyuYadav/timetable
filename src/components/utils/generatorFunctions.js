class LessonObj {
    constructor(lsn, teacher) {
        this.id = lsn.id;
        this.is_lab = lsn.is_lab;
        this.lesson_per_week = lsn.lesson_per_week;
        this.classroom = lsn.classroom;
        this.semester = lsn.semester;
        this.subject = lsn.subject;
        this.teacher = this.appendTeacher(teacher);
        this.time_off = [];

        this.generateTimeOff();
    }

    appendTeacher(teacher) {
        let newTeacher = { ...teacher };
        delete newTeacher.lesson_set;
        return newTeacher;
    }

    isTimeOffPresent(newTimeOff) {
        for (let i = 0; i < this.time_off.length; i++) {
            let oldTimeOff = this.time_off[i];
            if (
                oldTimeOff.bell_timing.id === newTimeOff.bell_timing.id &&
                oldTimeOff.working_day.id === newTimeOff.working_day.id
            )
                return true;
        }
        return false;
    }

    addTimeOffToLesson(timeOffList) {
        timeOffList.forEach((timeOff) => {
            if (!this.isTimeOffPresent(timeOff)) {
                let updatedTimeOff = { ...timeOff };
                delete updatedTimeOff.id;
                this.time_off = [...this.time_off, updatedTimeOff];
            }
        });
    }

    generateTimeOff() {
        this.addTimeOffToLesson(this.classroom["classroom_time_off_set"]);
        this.addTimeOffToLesson(this.semester["semester_time_off_set"]);
        this.addTimeOffToLesson(this.subject["subject_time_off_set"]);
        this.addTimeOffToLesson(this.teacher["teacher_time_off_set"]);
    }
}

class LessonClass {
    constructor() {
        this.lessons = [];
    }

    addLesson(teacher) {
        let lessonList = teacher["lesson_set"];
        if (lessonList && lessonList.length > 0) {
            let transformedData = lessonList.map(
                (lsn) => new LessonObj(lsn, teacher)
            );
            this.lessons = [...this.lessons, ...transformedData];
        }
    }
    insertLessons(teachers) {
        teachers.forEach((teacher) => {
            this.addLesson(teacher);
        });
        console.log(this.lessons);
    }
}

class TimeNode {
    constructor(time) {
        this.id = time.id;
        this.name = time.name;
        this.start_time = time.start_time;
        this.end_time = time.end_time;
        this.next = null;
    }
}

class TimeLinkedList {
    constructor(timeList) {
        this.root = null;
        this.generateList(timeList);
    }
    generateList(timeList) {
        this.root = new TimeNode(timeList[0]);
        let preNode = this.root;
        for (let i = 1; i < timeList.length; i++) {
            preNode.next = new TimeNode(timeList[i]);
            preNode = preNode.next;
        }
    }
}

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
        this.data = this.createSemesters(semesterList, dayList, timeList);
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
    const timeTable = new TimeTable(semesters, days, timings);
    console.log(timeTable.data);
    const timeLinked = new TimeLinkedList(timings);
    console.log(timeLinked.root);
    return {};
};
