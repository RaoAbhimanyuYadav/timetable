export class LessonNode {
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
        const { classroom_time_off_set, ...classroom } = this.classroom;
        this.classroom = classroom;
        const { subject_time_off_set, ...subject } = this.subject;
        this.subject = subject;

        this.semester_groups = this.semester_groups.map((semGrp) => {
            const grp = { ...semGrp };
            const { semester_time_off_set, ...sem } = semGrp.semester;
            grp.semester = sem;
            return grp;
        });
        this.teachers = this.teachers.map((tchr) => {
            const { teacher_time_off_set, ...teacher } = tchr;
            return teacher;
        });
        this.formatTimeOff();
    }
    formatTimeOff() {
        let data = {};
        let cnt = 0;
        this.time_off.forEach((tOff) => {
            let dayId = tOff.working_day.id;
            let timeId = tOff.bell_timing.id;
            if (!(dayId in data)) data[dayId] = {};
            if (!(timeId in data[dayId])) {
                data[dayId][timeId] = true;
                cnt++;
            }
        });
        this.total_time_off = cnt;
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

export class AllotedSlotNode {
    // TODO: Multiple color based on teacher
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

    assignSlot(classroomAssigned, grpAssigned, teacherAssigned, grpList) {
        this.classroomAssigned = classroomAssigned;
        this.grpAssigned = grpAssigned;
        this.teacherAssigned = teacherAssigned;
        this.grpList = grpList.map((grp) => {
            let lsn = { ...grp };
            lsn["lesson_length"] = lsn.colSpan;
            return new AllotedSlotNode(lsn, grp.hideUI, grp.semGrp);
        });
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
        return {
            val: !grpAlloted,
            msg: `Group ${grpAlloted ? "not " : ""}available`,
        };
    }

    isTeacherAvailable(teachers) {
        let tchrAlloted = false;
        teachers.forEach((teacher) => {
            tchrAlloted =
                tchrAlloted ||
                this.teacherAssigned.findIndex((tId) => tId === teacher.id) !==
                    -1;
        });
        return {
            val: !tchrAlloted,
            msg: `Teacher ${tchrAlloted ? "not " : ""}available`,
        };
    }

    isClassroomAvailable(room) {
        let roomAlloted =
            this.classroomAssigned.findIndex((cId) => cId === room.id) !== -1;

        return {
            val: !roomAlloted,
            msg: `Room ${roomAlloted ? "not " : ""}available`,
        };
    }

    isSlotAvailable(lsn) {
        let grp = this.isGroupAvailable(lsn.semester_groups);
        let tchr = this.isTeacherAvailable(lsn.teachers);
        let room = this.isClassroomAvailable(lsn.classroom);
        return {
            val: grp.val && tchr.val && room.val,
            msg: [grp.msg, tchr.msg, room.msg],
        };
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

    removeLectureForTheSlot(lsn) {
        // remove classroom
        let clsInd = this.classroomAssigned.findIndex(
            (id) => lsn.classroom.id === id
        );
        this.classroomAssigned.splice(clsInd, 1);
        // remove teachers
        lsn.teachers.forEach((teacher) => {
            let tInd = this.teacherAssigned.findIndex(
                (id) => id === teacher.id
            );
            this.teacherAssigned.splice(tInd, 1);
        });
        // remove semGrp
        lsn.semester_groups.forEach((semGrp) => {
            let grpInd = this.grpAssigned.findIndex(
                (grp) =>
                    grp[0] === semGrp.id &&
                    (semGrp.id === semGrp.semester.w_id) === grp[1]
            );
            this.grpAssigned.splice(grpInd, 1);

            if (semGrp.code.includes("G")) {
                grpInd = this.grpAssigned.findIndex(
                    (grp) => grp[0] === semGrp.semester.w_id && false === grp[1]
                );
                this.grpAssigned.splice(grpInd, 1);
            }

            // remove slot
            let sInd = this.grpList.findIndex((slot) => slot.id === lsn.id);
            this.grpList.splice(sInd, 1);
        });
    }
}

class DayNode {
    constructor(day) {
        this.day = day;
        this.lessonAssigned = []; // {lsnId, grpId}
        this.timings = []; // slotNode
    }

    assignTimings(lessonAssigned, timings) {
        this.lessonAssigned = lessonAssigned;
        this.timings = timings.map((timing) => {
            let currSlot = new SlotNode(timing.time);
            currSlot.assignSlot(
                timing.classroomAssigned,
                timing.grpAssigned,
                timing.teacherAssigned,
                timing.grpList
            );
            return currSlot;
        });
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
        return {
            val: !lsnAlloted,
            msg: [`Lesson {lsn & semGrp} ${lsnAlloted ? "not" : ""} available`],
        };
    }

    getTimeIndex(time) {
        return this.timings.findIndex((t) => t.time.id === time.id);
    }

    isTimeAvailableForLecture(time, lsn) {
        let timeIndex = this.getTimeIndex(time);
        if (timeIndex === -1) {
            let newSlot = new SlotNode(time);
            this.timings.push(newSlot);
            return { val: true, msg: ["Time slot created"] };
        }
        return this.timings[timeIndex].isSlotAvailable(lsn);
    }

    isTimeAvailableForLab(time, lsn, timeList) {
        // find start time in timelist
        while (timeList.id !== time.id) timeList = timeList.next;
        let lsn_length = lsn.lesson_length;

        while (lsn_length > 0 && timeList !== null) {
            let availability = this.isTimeAvailableForLecture(timeList, lsn);
            if (availability.val) {
                lsn_length--;
                timeList = timeList.next;
            } else return { ...availability, val: false };
        }

        let timeAvailable = lsn_length === 0;
        return {
            val: timeAvailable,
            msg: [`${timeAvailable ? "" : "Not"} enough timing available`],
        };
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

            this.assignLectureForTheDay(timeList, lsn, hideUI);

            lsn_length--;
            timeList = timeList.next;
            hideUI = 1;
        }
    }

    removeLectureForTheDay(time, lsn) {
        let timeIndex = this.getTimeIndex(time);
        lsn.semester_groups.forEach((semGrp) => {
            // remove lsnId and semId
            let i = this.lessonAssigned.findIndex(
                ({ lsnId, grpId }) => lsnId === lsn.id && grpId === semGrp.id
            );
            this.lessonAssigned.splice(i, 1);
        });

        // remove data from slot
        this.timings[timeIndex].removeLectureForTheSlot(lsn);
    }

    removeLabForTheDay(time, lsn, timeList) {
        while (timeList.id !== time.id) timeList = timeList.next;

        let lsn_length = lsn.lesson_length;

        while (lsn_length > 0) {
            if (timeList === null) {
                console.log("timelist null bug");
                return;
            }

            this.removeLectureForTheDay(timeList, lsn);
            lsn_length--;
            timeList = timeList.next;
        }
    }
}

export class AllotedLessons {
    constructor(timings) {
        this.days = [];
        this.timeList = this.createTimeList(timings);
    }

    assignSavedDays(days) {
        this.days = days.map((day) => {
            let currDay = new DayNode(day.day);
            currDay.assignTimings(day.lessonAssigned, day.timings);
            return currDay;
        });
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
            return { val: true, msg: ["Day created"] };
        }
        return this.days[dayIndex].isLessonAvailable(lsn);
    }

    isTimeAvailableForSemster(day, lsn, time) {
        if (lsn.time_off[day.id] && lsn.time_off[day.id][time.id]) {
            return { val: false, msg: ["TIME OFF"] };
        }

        let dayIndex = this.getDayIndex(day);
        if (dayIndex === -1) {
            let newDay = new DayNode(day);
            this.days.push(newDay);
            dayIndex = this.getDayIndex(day);
        }
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

    generateFormattedData() {
        let finalData = {};

        this.days.forEach((d) => {
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
        return finalData;
    }

    removeLesson(day, time, lsn) {
        let dayIndex = this.getDayIndex(day);
        if (lsn.lesson_length === 1)
            this.days[dayIndex].removeLectureForTheDay(time, lsn, 0);
        else if (lsn.lesson_length > 1)
            this.days[dayIndex].removeLabForTheDay(time, lsn, this.timeList);
        else console.log("Remove lecture for lesson length < 1");
    }
}

export class GeneratorClass {
    constructor(timings, days, lessons) {
        this.days = days;
        this.timings = timings;
        this.lessons = new LessonClass(lessons);
        this.data = new AllotedLessons(timings);
        this.lessonNotAssigned = [];
    }

    assignSavedData(localData, localExtra) {
        this.lessonNotAssigned = localExtra;
        this.data.assignSavedDays(localData.days);
    }

    findDayIndex(start, lsn) {
        // search for the day
        let dayIndex;
        for (dayIndex = start; dayIndex < this.days.length; dayIndex++) {
            if (this.data.isDayAvailableForLesson(lsn, this.days[dayIndex]).val)
                break;
        }
        return dayIndex;
    }

    findTimeIndex(day, lsn) {
        // Search for the Time Slot
        let timeIndex;
        for (timeIndex = 0; timeIndex < this.timings.length; timeIndex++) {
            let time = this.timings[timeIndex];
            // Check time off for this timing
            if (lsn.time_off[day.id] && lsn.time_off[day.id][time.id]) continue;
            if (this.data.isTimeAvailableForSemster(day, lsn, time).val) break;
        }
        return timeIndex;
    }

    bruteForceDayTime(lsn) {
        // try to assign multiple same lsn on same day
        for (let dayIndex = 0; dayIndex < this.days.length; dayIndex++) {
            let timeIndex = this.findTimeIndex(this.days[dayIndex], lsn);
            if (timeIndex >= this.timings.length) {
                continue;
            }
            return {
                dayIndex,
                timeIndex,
            };
        }
        return { dayIndex: this.days.length, timeIndex: this.timings.length };
    }

    findDayTimeIndex(lsn) {
        let dayIndex = this.findDayIndex(0, lsn);

        if (dayIndex >= this.days.length) {
            // no day available
            return this.bruteForceDayTime(lsn);
        } else {
            while (true) {
                if (dayIndex >= this.days.length) {
                    // no day time found
                    return this.bruteForceDayTime(lsn);
                }
                let day = this.days[dayIndex];
                let timeIndex = this.findTimeIndex(day, lsn);
                if (timeIndex >= this.timings.length) {
                    // timing not available on that day check for remaining days
                    dayIndex++;
                } else {
                    // day and time both found
                    return {
                        dayIndex,
                        timeIndex,
                    };
                }
            }
        }
    }

    assignALesson(lsn) {
        while (lsn.lesson_per_week > 0) {
            const { dayIndex, timeIndex } = this.findDayTimeIndex(lsn);

            if (
                dayIndex >= this.days.length ||
                timeIndex >= this.timings.length
            ) {
                this.lessonNotAssigned.push(lsn);
                break;
            }
            // Assign Lecture
            this.data.assignLecture(
                this.days[dayIndex],
                this.timings[timeIndex],
                lsn
            );
            // lecture Assigned
            lsn.lesson_per_week--;
        }
    }

    lessonsLoop(lsns) {
        lsns.sort((a, b) => {
            // if (a.teachers[0].id === b.teachers[0].id) {
            return b.total_time_off - a.total_time_off === 0
                ? b.lesson_per_week - a.lesson_per_week
                : b.total_time_off - a.total_time_off;
            // } else return a.teachers[0].id - b.teachers[0].id;
        });
        for (let i = 0; i < lsns.length; i++) {
            let lsn = lsns[i];
            this.assignALesson(lsn);
        }
    }

    generateTimeTable() {
        this.lessonsLoop(this.lessons.labs.concat(this.lessons.lectures));
        // this.lessonsLoop(this.lessons.lectures);
    }

    removeAllotedLesson(day, time, lsn) {
        this.data.removeLesson(day, time, lsn);
    }
}
