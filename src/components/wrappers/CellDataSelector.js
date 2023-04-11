import { Grid } from "@mui/material";
import AllotedLecturesWapper from "./AllotedLecturesWapper";
import CellWrapper from "./CellWrapper";
import { EmptyLecture } from "./EmptyLecture";

const CellDataSelector = ({
    generatedTimeTable,
    data,
    day,
    timeslot,
    handleDaD,
}) => {
    const slotData =
        generatedTimeTable[data.id] && generatedTimeTable[data.id][day.id]
            ? generatedTimeTable[data.id][day.id][timeslot.id]
            : undefined;

    const info = {
        day: day,
        time: timeslot,
    };

    return (
        <CellWrapper>
            <Grid container sx={{ height: "100%" }}>
                {slotData && slotData.length > 0 ? (
                    <Grid item xs={12}>
                        <AllotedLecturesWapper
                            slotData={slotData}
                            info={info}
                            handleDaD={handleDaD}
                        />
                    </Grid>
                ) : (
                    <EmptyLecture info={info} handleDaD={handleDaD} />
                )}
            </Grid>
        </CellWrapper>
    );
};

export default CellDataSelector;
