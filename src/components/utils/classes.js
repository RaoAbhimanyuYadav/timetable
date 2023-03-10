class LessonNode {
    constructor(lsn, teacher) {
        this.id = lsn.id;
        this.is_lab = lsn.is_lab;
        this.lesson_per_week = lsn.lesson_per_week;
        this.classroom = lsn.classroom;
        this.semester = lsn.semester;
        this.semGroup = lsn.semester_group;
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

export class LessonClass {
    constructor() {
        this.lessons = [];
    }

    addLesson(teacher) {
        let lessonList = teacher["lesson_set"];
        if (lessonList && lessonList.length > 0) {
            let transformedData = lessonList.map(
                (lsn) => new LessonNode(lsn, teacher)
            );
            this.lessons = [...this.lessons, ...transformedData];
        }
    }
    insertLessons(teachers) {
        teachers.forEach((teacher) => {
            this.addLesson(teacher);
        });
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

export class TimeLinkedList {
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

class AllotedSlotNode {
    constructor(lsn, display) {
        // Property
        this.show = display;
        this.isGrouped = lsn.semGroup.code.includes("G");
        this.groups = [];
        this.colSpan = lsn.is_lab ? 2 : 1;
        this.height = "25px";
        this.totalGroups = lsn.semester.semester_group_set.length - 1;

        // Values
    }
    appendGroup(lsn) {
        this.groups.push({
            semGroup: lsn.semGroup,
            id: lsn.id,
            is_lab: lsn.is_lab,
            classroom: lsn.classroom,
            semester: lsn.semester,
            subject: lsn.subject,
            teacher: lsn.teacher,
        });
    }
}

class SlotNode {
    constructor(time) {
        this.time = time;
        this.semGroupAssigned = []; //  if(G_) add W also
        this.teacherAssigned = []; // id
        this.classroomAssigned = []; // id
        this.semesterList = []; // allotedSlotNode
    }
    isGroupAvailable(grp) {
        return this.semGroupAssigned.findIndex((gId) => gId === grp.id) === -1;
    }
    isTeacherAvailable(teacher) {
        return (
            this.teacherAssigned.findIndex((tId) => tId === teacher.id) === -1
        );
    }
    isClassroomAvailable(room) {
        return (
            !this.classroomAssigned.findIndex((cId) => cId === room.id) === -1
        );
    }
    isSlotAvailable(lsn) {
        return (
            this.isGroupAvailable(lsn.semGroup) &&
            this.isTeacherAvailable(lsn.teacher) &&
            this.isClassroomAvailable(lsn.classroom)
        );
    }
    pushNewSlot(lsn, display) {
        let newSlot = new AllotedSlotNode(lsn, display);
        newSlot.appendGroup(lsn);
        this.semesterList.push(newSlot);
    }
    assignLectureForTheSlot(lsn, display) {
        // mark semGroup
        this.semGroupAssigned.push(lsn.semGroup.id);
        if (lsn.semGroup.code.includes("G")) {
            let wGrpIndex = lsn.semester.semester_group_set.findIndex(
                (grp) => grp.code === "W"
            );
            if (wGrpIndex === -1) {
                console.log("Whole grp bug");
                return false;
            }
            this.semGroupAssigned.push(
                lsn.semester.semester_group_set[wGrpIndex].id
            );
        }
        // mark classroom
        this.classroomAssigned.push(lsn.classroom.id);
        // mark teacher
        this.teacherAssigned.push(lsn.teacher.id);
        // add data to slot

        if (lsn.semGroup.code.includes("W")) {
            this.pushNewSlot(lsn, display);
        } else {
            // try to find either another group is present or not
            let semIndex = this.semesterList.findIndex(
                (sem) => sem.semester.id === lsn.semester.id
            );
            if (semIndex === -1) {
                this.pushNewSlot(lsn, display);
            } else {
                this.semesterList[semIndex].appendGroup(lsn);
            }
        }
    }
}

class DayNode {
    constructor(day) {
        this.day = day;
        this.lessonAssigned = []; // {lsnId, semId}
        this.timings = []; // slotNode
    }
    isLessonAvailable(lsn) {
        return (
            this.lessonAssigned.findIndex(
                (lesson) =>
                    lesson.lsnId === lsn.id && lesson.semId === lsn.semester.id
            ) === -1
        );
    }
    getTimeIndex(time) {
        return this.timings.findIndex((t) => t.time.id === time.id);
    }
    isTimeAvailableForLecture(time, lsn) {
        let timeIndex = this.getTimeIndex(time);
        if (timeIndex === -1) return true;
        return this.timings[timeIndex].isSlotAvailable(lsn);
    }
    isTimeAvailableForLab(time, lsn, timeList) {
        while (timeList.id !== time.id) timeList = timeList.next;
        timeList = timeList.next;
        if (timeList === null) return false;

        return (
            this.isTimeAvailableForLecture(time, lsn) &&
            this.isTimeAvailableForLecture(timeList, lsn)
        );
    }

    assignLectureForTheDay(time, lsn, display) {
        let timeIndex = this.getTimeIndex(time);
        if (timeIndex === -1) {
            let newSlot = new SlotNode(time);
            this.timings.push(newSlot);
            timeIndex = this.getTimeIndex(time);
        }
        // mark lsnId and semId
        this.lessonAssigned.push({ lsnId: lsn.id, semId: lsn.semester.id });
        // add data to slot
        this.timings[timeIndex].assignLectureForTheSlot(lsn, display);
    }

    assignLabForTheDay(time, lsn, timeList) {
        while (timeList.id !== time.id) timeList = timeList.next;
        timeList = timeList.next;
        this.assignLectureForTheDay(time, lsn, 1);
        this.assignLectureForTheDay(timeList, lsn, 0);
    }
}

export class AllotedLessons {
    constructor(timings) {
        this.days = [];
        this.timeList = this.createTimeList(timings);
    }
    createTimeList(timings) {
        let timeLinkedList = new TimeLinkedList(timings);
        return timeLinkedList.root;
    }
    getDayIndex(day) {
        return this.days.findIndex((d) => day.id === d.day.id);
    }
    isDayAvailableForLesson(lsn, day) {
        let dayIndex = this.getDayIndex(day);
        if (dayIndex === -1) return true;
        return this.days[dayIndex].isLessonAvailable(lsn);
    }
    isTimeAvailableForSemster(day, lsn, time) {
        let dayIndex = this.getDayIndex(day);
        if (dayIndex === -1) return true;
        if (lsn.is_lab) {
            return this.days[dayIndex].isTimeAvailableForLab(
                time,
                lsn,
                this.timeList
            );
        }
        return this.days[dayIndex].isTimeAvailableForLecture(time, lsn);
    }

    assignLecture(day, time, lsn) {
        let dayIndex = this.getDayIndex(day);
        if (dayIndex === -1) {
            let newDay = new DayNode(day);
            this.days.push(newDay);
            dayIndex = this.getDayIndex(day);
        }
        if (lsn.is_lab)
            this.days[dayIndex].assignLabForTheDay(time, lsn, this.timeList);
        else this.days[dayIndex].assignLectureForTheDay(time, lsn, 1);
    }
}
