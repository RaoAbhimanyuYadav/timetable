class LessonNode {
    // Store information regarding a LESSON
    constructor(lsn) {
        this.id = lsn.id;
        this.lesson_length = lsn.lesson_length;
        this.lesson_per_week = lsn.lesson_per_week;
        this.classroom = lsn.classroom;
        this.subject = lsn.subject;
        this.semester_groups = lsn.semester_group;
        this.teachers = lsn.teacher;
        this.time_off = [];

        this.generateTimeOff(lsn);
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
                this.time_off.push(updatedTimeOff);
            }
        });
    }

    generateTimeOff(lsn) {
        this.addTimeOffToLesson(lsn.classroom["classroom_time_off_set"]);
        this.addTimeOffToLesson(lsn.subject["subject_time_off_set"]);
        lsn.semester_group.forEach((semGrp) => {
            this.addTimeOffToLesson(semGrp.semester["semester_time_off_set"]);
        });
        lsn.teacher.forEach((tchr) => {
            this.addTimeOffToLesson(tchr["teacher_time_off_set"]);
        });

        // remove timeoff
        delete this.classroom["classroom_time_off_set"];
        delete this.subject["subject_time_off_set"];
        this.semester_groups.forEach((semGrp) => {
            delete semGrp.semester["semester_time_off_set"];
        });
        this.teachers.forEach((tchr) => {
            delete tchr["teacher_time_off_set"];
        });
        this.formatTimeOff();
    }
    formatTimeOff() {
        let data = {};
        this.time_off.forEach((tOff) => {
            let dayId = tOff.working_day.id;
            let timeId = tOff.bell_timing.id;
            if (!(dayId in data)) data[dayId] = {};
            if (!(timeId in data[dayId])) data[dayId][timeId] = true;
        });
        this.time_off = data;
    }
}

export class LessonClass {
    constructor(lessons) {
        this.lectures = [];
        this.labs = [];
        this.insertLessons(lessons);
    }

    addLesson(lsn) {
        if (lsn.lesson_length === 1) {
            let lecture = new LessonNode(lsn);
            this.lectures.push(lecture);
        } else if (lsn.lesson_length > 1) {
            let lab = new LessonNode(lsn);
            this.labs.push(lab);
        }
    }
    insertLessons(lessons) {
        lessons.forEach((lsn) => {
            this.addLesson(lsn);
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

class AllotedSlotNode {
    constructor(lsn, hideUI, semGrp) {
        // Property
        this.hideUI = hideUI; //0 to show, 1 to hide
        this.isGrouped = semGrp.code.includes("G");
        this.colSpan = lsn.lesson_length;
        this.totalGroups = semGrp.semester.total_groups;
        this.color = lsn.teachers[0].color;
        this.grpNum = +semGrp.code.substring(1);

        // Values
        this.id = lsn.id;
        this.subject = lsn.subject;
        this.classroom = lsn.classroom;
        this.teachers = lsn.teachers;
        this.semGrp = semGrp;
        this.semester = semGrp.semester;
    }
}

class SlotNode {
    constructor(time) {
        this.time = time;
        this.grpAssigned = []; //  [id, flag] if G then add [w,false]
        this.teacherAssigned = []; // id
        this.classroomAssigned = []; // id
        this.grpList = []; // allotedSlotNode -> sem + grp + visiblity
    }

    isGroupAvailable(grps) {
        let grpAlloted = false;
        grps.forEach((grp) => {
            // grp is not assigned
            // whole class is also not assigned
            let g =
                this.grpAssigned.findIndex((gId) => gId[0] === grp.id) !== -1;
            let w =
                this.grpAssigned.findIndex(
                    (gId) => gId[0] === grp.semester.w_id && gId[1]
                ) !== -1;
            grpAlloted = grpAlloted || g || w;
        });
        return !grpAlloted;
    }

    isTeacherAvailable(teachers) {
        let tchrAlloted = false;
        teachers.forEach((teacher) => {
            tchrAlloted =
                tchrAlloted ||
                this.teacherAssigned.findIndex((tId) => tId === teacher.id) !==
                    -1;
        });
        return !tchrAlloted;
    }

    isClassroomAvailable(room) {
        return (
            this.classroomAssigned.findIndex((cId) => cId === room.id) === -1
        );
    }

    isSlotAvailable(lsn) {
        return (
            this.isGroupAvailable(lsn.semester_groups) &&
            this.isTeacherAvailable(lsn.teachers) &&
            this.isClassroomAvailable(lsn.classroom)
        );
    }

    pushNewSlot(lsn, hideUI, semGrp) {
        let newSlot = new AllotedSlotNode(lsn, hideUI, semGrp);
        this.grpList.push(newSlot);
    }

    assignLectureForTheSlot(lsn, hideUI) {
        // mark classroom
        this.classroomAssigned.push(lsn.classroom.id);
        // mark teachers
        lsn.teachers.forEach((teacher) => {
            this.teacherAssigned.push(teacher.id);
        });

        lsn.semester_groups.forEach((semGrp) => {
            // mark semester_groups
            this.grpAssigned.push([
                semGrp.id,
                semGrp.id === semGrp.semester.w_id,
            ]);

            if (semGrp.code.includes("G")) {
                this.grpAssigned.push([semGrp.semester.w_id, false]);
            }
            // add data to slot
            this.pushNewSlot(lsn, hideUI, semGrp);
        });
    }
}

class DayNode {
    constructor(day) {
        this.day = day;
        this.lessonAssigned = []; // {lsnId, grpId}
        this.timings = []; // slotNode
    }

    isLessonAvailable(lsn) {
        let lsnAlloted = false;
        lsn.semester_groups.forEach((semGrp) => {
            lsnAlloted =
                lsnAlloted ||
                this.lessonAssigned.findIndex(
                    (lsnAssigned) =>
                        lsnAssigned.lsnId === lsn.id &&
                        lsnAssigned.grpId === semGrp.id
                ) !== -1;
        });
        return !lsnAlloted;
    }

    getTimeIndex(time) {
        return this.timings.findIndex((t) => t.time.id === time.id);
    }

    isTimeAvailableForLecture(time, lsn) {
        let timeIndex = this.getTimeIndex(time);
        if (timeIndex === -1) {
            let newSlot = new SlotNode(time);
            this.timings.push(newSlot);
            return true;
        }
        return this.timings[timeIndex].isSlotAvailable(lsn);
    }

    isTimeAvailableForLab(time, lsn, timeList) {
        // find start time in timelist
        while (timeList.id !== time.id) timeList = timeList.next;
        let lsn_length = lsn.lesson_length;

        while (lsn_length > 0 && timeList !== null) {
            if (this.isTimeAvailableForLecture(timeList, lsn)) {
                lsn_length--;
                timeList = timeList.next;
            } else return false;
        }

        return lsn_length === 0;
    }

    assignLectureForTheDay(time, lsn, hideUI) {
        let timeIndex = this.getTimeIndex(time);

        lsn.semester_groups.forEach((semGrp) => {
            // mark lsnId and semId
            // it ensure that this day grp is assigned this lecture
            // so don't assign more class
            this.lessonAssigned.push({ lsnId: lsn.id, grpId: semGrp.id });
        });

        // add data to slot
        this.timings[timeIndex].assignLectureForTheSlot(lsn, hideUI);
    }

    assignLabForTheDay(time, lsn, timeList) {
        while (timeList.id !== time.id) timeList = timeList.next;

        let lsn_length = lsn.lesson_length;
        let hideUI = 0;

        while (lsn_length > 0) {
            if (timeList === null) {
                console.log("timelist null bug");
                return;
            }

            this.assignLectureForTheDay(time, lsn, hideUI);

            lsn_length--;
            timeList = timeList.next;
            hideUI = 1;
        }
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
        if (dayIndex === -1) {
            let newDay = new DayNode(day);
            this.days.push(newDay);
            return true;
        }
        return this.days[dayIndex].isLessonAvailable(lsn);
    }

    isTimeAvailableForSemster(day, lsn, time) {
        let dayIndex = this.getDayIndex(day);
        if (lsn.lesson_length === 1) {
            return this.days[dayIndex].isTimeAvailableForLecture(time, lsn);
        } else if (lsn.lesson_length > 1) {
            return this.days[dayIndex].isTimeAvailableForLab(
                time,
                lsn,
                this.timeList
            );
        }
    }

    assignLecture(day, time, lsn) {
        let dayIndex = this.getDayIndex(day);

        if (lsn.lesson_length === 1)
            this.days[dayIndex].assignLectureForTheDay(time, lsn, 0);
        else if (lsn.lesson_length > 1)
            this.days[dayIndex].assignLabForTheDay(time, lsn, this.timeList);
        else console.log("Assign lecture for lesson length < 1");
    }
}
