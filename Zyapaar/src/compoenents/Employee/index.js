import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import {
  getEmployeeList,
  setUser,
  deleteUser,
} from "../../redux/actions/Employee";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ConfirmDltDialog from "../../ConfirmDltDialog";

const columns = [
  { id: "id", label: "id"},
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "first_name",
    label: "First Name",
    minWidth: 150,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "last_name",
    label: "Last Name",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "20px",
    margin: "10px auto",
  },
  container: {
    maxHeight: 440,
  },
});

export default function Employee() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { user } = useSelector(({ USER }) => USER);
  const [openConfirmDltDialog, setopenConfirmDltDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getEmployeeList());
  }, []);

  const handelAction = (user) => {
    
    dispatch(setUser(user));
    nevigate("/editemployee");
  };

  const handelActionDelete = (user) => {
    console.log(user.id)
    setSelectedUser(user);
    setopenConfirmDltDialog(true);
  };

  const handleCancelDelete = () => {
    setopenConfirmDltDialog(false);
  };
  const handleConfirmDelete = (user) => {

    setopenConfirmDltDialog(false);
    dispatch(deleteUser(selectedUser.id), () => dispatch(getEmployeeList()));
  };
  const renderValue = (col, row) => {
    if (col.id === "name") {
      return row[col.id] || "-";
    } else if (col.id === "action") {
      return (
        <>
          <a onClick={() => handelAction(row)} style={{ cursor: "pointer",color: "skyblue" }}>
            Edit
          </a>{" "}
          /{" "}
          <a
            onClick={() => handelActionDelete(row)}
            style={{ cursor: "pointer",color: "skyblue" }}
          >
            Delete
          </a>
        </>
      );
    }

    return row[col.id] || "-";
  };

  const handelAdd = () => {
    nevigate("/addemployee");
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h2">
        Employee
      </Typography>
      <Button
        variant="contained"
        onClick={handelAdd}
        style={{ float: "right", marginBottom: "10px", marginRight: "12%",width:'150px' }}
      >
        Add
      </Button>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!user &&
              user
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`row-${index}`}
                    >
                      {columns.map((col, index) => {
                        return (
                          <>
                            <TableCell key={`colData-${index}`}>
                              {renderValue(col, row)}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user && user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmDltDialog
        open={openConfirmDltDialog}
        content={`Are you sure you want to delete ${
          !!selectedUser ? selectedUser.first_name : ""
        } ${!!selectedUser ? selectedUser.last_name : ""}?  `}
        content1={`All information about this employee will be permanently deleted. `}
        btnLabels={{
          no: "No",
          Yes: "Yes",
        }}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Paper>
  );
}
