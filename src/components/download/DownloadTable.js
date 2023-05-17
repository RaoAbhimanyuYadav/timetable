import DownloadTableHeader from "./DownloadTableHeader";
import DownloadTableBody from "./DownloadTableBody";
import { Table, Typography } from "@mui/material";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CustomButton } from "../utils/customComponents";

const DownloadTable = ({ generatedTimetable, data }) => {
    const ref = useRef();
    const handleDownload = () => {
        const input = ref.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${data.name}.pdf`);
        });
    };
    return (
        <div
            style={{
                position: "relative",
                marginBottom: "2rem",
            }}
        >
            <CustomButton
                variant="outlined"
                color="primary"
                onClick={handleDownload}
                sx={{ position: "absolute", right: "10px", top: "10px" }}
            >
                Download
            </CustomButton>
            <div
                style={{ backgroundColor: "#fff", width: "fit-content" }}
                ref={ref}
            >
                <Typography
                    sx={{
                        fontSize: "4rem",
                        textAlign: "center",
                        color: "black",
                    }}
                >
                    {data.name}{" "}
                </Typography>
                <Table
                    sx={{
                        tableLayout: "fixed",
                        width: "1400px",
                    }}
                >
                    <DownloadTableHeader />
                    <DownloadTableBody
                        generatedTimetable={generatedTimetable}
                        data={data}
                    />
                </Table>
            </div>
        </div>
    );
};

export default DownloadTable;
