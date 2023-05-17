import { useSelector } from "react-redux";
import DownloadTable from "./DownloadTable";

const DownloadAll = ({ viewSelectorFunc, generatedTimetable }) => {
    const data = useSelector(viewSelectorFunc);

    return data.map((d) => (
        <DownloadTable
            key={d.id}
            generatedTimetable={generatedTimetable}
            data={d}
        />
    ));
};

export default DownloadAll;
