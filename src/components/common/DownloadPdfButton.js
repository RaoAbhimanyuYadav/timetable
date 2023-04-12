import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CustomButton } from "../utils/customComponents";

function DownloadPDFButton() {
    const downloadPDF = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("download.pdf");
        });
    };

    return <CustomButton onClick={downloadPDF}>Download PDF</CustomButton>;
}

export default DownloadPDFButton;
