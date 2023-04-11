import { Grid } from "@mui/material";
import TextWrapper from "./TextWrapper";

const gridItemCSS = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export const LectureInfo = ({ subject, teachers, room, height }) => {
    return (
        <Grid container sx={{ height }}>
            <Grid item xs={12} sx={gridItemCSS}>
                <TextWrapper>{subject}</TextWrapper>
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                <TextWrapper>{room}</TextWrapper>
            </Grid>
            <Grid item xs={6} sx={gridItemCSS}>
                <TextWrapper>
                    {teachers.map(
                        (t, i) =>
                            `${t.code}${i + 1 === teachers.length ? "" : ", "}`
                    )}
                </TextWrapper>
            </Grid>
        </Grid>
    );
};
