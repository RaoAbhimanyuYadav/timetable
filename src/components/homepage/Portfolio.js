import sign_in from "./img/signin_page.jpeg";
import profile from "./img/profile_.jpeg";
import subject from "./img/subj_.jpeg";
import classroom from "./img/classroom_.jpeg";
import semester from "./img/semester_.jpeg";
import teacher from "./img/teacher_.jpeg";
import timetable from "./img/timetable.jpeg";
import finalTimetable from "./img/final_timetable.jpeg";

const CONTENTS = [
    {
        heading: "Login/Signup",
        content:
            "New user has to signup with email id and password. Only then user can access this software",
        imgSrc: sign_in,
    },
    {
        heading: "Profile",
        content:
            "Navigate to the 'Profile'  section and it will show the bell timimgs i.e start and end of classes,working days,and number of groups.",
        imgSrc: profile,
    },
    {
        heading: "Add Subjects",
        content:
            "Navigate to the 'Subjects' section and add            corresponding details like subject name, subject            code and timings for that particular subject.",
        imgSrc: subject,
    },
    {
        heading: "Add Classrooms",
        content:
            " Navigate to the 'Classrooms' section and add            corresponding details like classroom name,code and            off timings of the classes.",
        imgSrc: classroom,
    },
    {
        heading: "Add Semesters",
        content:
            "Navigate to the 'Semester' section and add            corresponding details like course name,subject code,classroom code, number of the groups etc.",
        imgSrc: semester,
    },
    {
        heading: "Add Teachers",
        content:
            "Navigate to the 'Teacher' section and add            corresponding details like Name of the teacher and            color codes for particular teacher.",
        imgSrc: teacher,
    },
    {
        heading: "View Timetable",
        content:
            "Navigate to the 'View Timetable' section and user            can generate the timetable after generation user can            view and download the timetable.",
        imgSrc: timetable,
    },
    {
        heading: "Final Timetable",
        content:
            "Navigate to the 'View Timetable' section and user            can view and download the final timetable.",
        imgSrc: finalTimetable,
    },
];

const Portfolio = () => {
    return (
        <section class="portfolio" id="portfolio">
            <div class="main-text">
                <h2>
                    <span>How to </span>Use
                </h2>
            </div>
            <div class="portfolio-content">
                {CONTENTS.map((content) => {
                    return (
                        <div class="row" key={content.heading}>
                            <img src={content.imgSrc} />
                            <div class="layer">
                                <h5>{content.heading}</h5>
                                <p>{content.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Portfolio;
