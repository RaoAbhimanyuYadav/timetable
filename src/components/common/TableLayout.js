import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import AddEditDialog from "./AddEditDialog";
import ConfirmDelete from "./ConfirmDelete";
import { CustomCell, CellInsideWrapper } from "../utils/customComponents";
import NameExtractor from "../specific/NameExtractor";
import { useSelector } from "react-redux";

const TableLayout = ({
    tableBodykey,
    tableHeadings,
    selectorFunc,
    deleteHandler,
    formFields,
    formSubmitHandler,
}) => {
    const data = useSelector(selectorFunc) || [];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {tableHeadings.map((instance) => {
                        return (
                            <CustomCell key={instance}>
                                <CellInsideWrapper sx={{ fontWeight: "700" }}>
                                    {instance}
                                </CellInsideWrapper>
                            </CustomCell>
                        );
                    })}
                    <CustomCell></CustomCell>
                    <CustomCell></CustomCell>
                </TableRow>
            </TableHead>
            {data.length === 0 ? (
                <></>
            ) : (
                <TableBody>
                    {data.map((obj) => {
                        return (
                            <TableRow key={obj.id}>
                                {tableBodykey.map((instance) => {
                                    return (
                                        <CustomCell key={instance}>
                                            <CellInsideWrapper>
                                                <NameExtractor
                                                    objKey={instance}
                                                    obj={obj}
                                                />
                                            </CellInsideWrapper>
                                        </CustomCell>
                                    );
                                })}
                                <CustomCell>
                                    <CellInsideWrapper>
                                        <AddEditDialog
                                            formFields={formFields}
                                            formSubmitHandler={
                                                formSubmitHandler
                                            }
                                            formData={obj}
                                            maxWidth={"md"}
                                        />
                                    </CellInsideWrapper>
                                </CustomCell>
                                <CustomCell>
                                    <CellInsideWrapper>
                                        <ConfirmDelete
                                            tableBodykey={tableBodykey}
                                            data={obj}
                                            deleteHandler={deleteHandler}
                                        />
                                    </CellInsideWrapper>
                                </CustomCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            )}
        </Table>
    );
};

export default TableLayout;
