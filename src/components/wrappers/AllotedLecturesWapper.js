import { Grid } from "@mui/material";
import AllotedLecture from "./AllotedLecture";
import { EmptyLecture } from "./EmptyLecture";

const AllotedLecturesWrapper = ({ slotData, info, handleDaD }) => {
    let rows = slotData[0].isGrouped ? slotData[0].totalGroups : 1;
    let newData = [];
    for (let i = 1; i <= rows && rows > 1; i++) {
        let index = slotData.findIndex((d) => d.grpNum === i);
        if (index === -1) newData.push(null);
        else newData.push(slotData[index]);
    }
    let top = false;
    let bottom = false;

    return (
        <Grid
            container
            sx={{ display: "grid", height: "100%" }}
            gridTemplateRows={`repeat(${rows}, 1fr)`}
        >
            {(rows > 1 ? newData : slotData).map((d, i) => {
                if (i === 0 && rows !== 1 && d) {
                    top = false;
                    bottom = true;
                } else if (i === rows - 1 && !bottom && rows !== 1) {
                    top = true;
                    bottom = false;
                }
                if (i === rows - 1) {
                    bottom = false;
                }
                return d ? (
                    <AllotedLecture
                        info={info}
                        key={i}
                        top={top}
                        bottom={bottom}
                        data={d}
                        width={`${d.colSpan * 100}%`}
                        bgColor={d.color}
                        height={"100%"}
                        handleDaD={handleDaD}
                    />
                ) : (
                    <EmptyLecture key={i} info={info} handleDaD={handleDaD} />
                );
            })}
        </Grid>
    );
};

export default AllotedLecturesWrapper;
