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
    tableBodykey.forEach((instance) => {
      name += obj[instance] + " ";
    });
    return name;
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
          {tableBodyData.map((obj) => {
            return (
              <TableRow key={obj.id}>
                {tableBodykey.map((instance, index) => {
                  return (
                    <CustomCell key={index}>
                      <CellInsideWrapper>
                        {typeof obj[instance] !== "object" ? (
                          obj[instance]
                        ) : instance === "teacher" ? (
                          <>
                            {obj[instance].name}
                            <br />({obj[instance].nick_name})
                          </>
                        ) : (
                          `${obj[instance].semester}`
                        )}
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
