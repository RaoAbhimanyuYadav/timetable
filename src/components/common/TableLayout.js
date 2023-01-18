import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import AddEditDialog from "./AddEditDialog";
import ConfirmDelete from "./ConfirmDelete";
import { CustomCell, CellInsideWrapper } from "../utils/customComponents";

const TableLayout = ({
  tableBodyData,
  tableBodykey,
  tableHeadings,
  deleteHandler,
  formFields,
  formSubmitHandler,
}) => {
  const objNameExtractor = (obj) => {
    let name = "";
    tableBodykey.forEach((key) => {
      if (typeof obj[key] === "string" || typeof obj[key] === "number")
        name += obj[key] + " ";
    });
    return name;
  };

  const nameExtractor = (key, obj) => {
    if (typeof obj[key] === "string" || typeof obj[key] === "number")
      return obj[key];
    if (typeof obj[key] === "object") {
      if (Array.isArray(obj[key])) {
        if (key.includes("_time_off")) {
          return obj[key].map((ele, i) => (
            <span id={i} key={i}>
              {`${ele.day} : ${ele.time_start}-${ele.time_end}`}
              <br />
            </span>
          ));
        }
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHeadings.map((instance, index) => {
            return (
              <CustomCell key={index}>
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
      {tableBodyData.length === 0 ? (
        <></>
      ) : (
        <TableBody>
          {tableBodyData.map((obj, i) => {
            return (
              <TableRow key={i}>
                {tableBodykey.map((instance, index) => {
                  return (
                    <CustomCell key={index}>
                      <CellInsideWrapper>
                        {nameExtractor(instance, obj)}
                      </CellInsideWrapper>
                    </CustomCell>
                  );
                })}
                <CustomCell>
                  <CellInsideWrapper>
                    <AddEditDialog
                      formFields={formFields}
                      formSubmitHandler={formSubmitHandler}
                      formData={obj}
                    />
                  </CellInsideWrapper>
                </CustomCell>
                <CustomCell>
                  <CellInsideWrapper>
                    <ConfirmDelete
                      objName={objNameExtractor(obj)}
                      id={obj.id}
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
