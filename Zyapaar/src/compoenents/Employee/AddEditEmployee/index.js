import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import {
  editUserList,
  addUser,
  getEmployeeList,
} from "../../../redux/actions/Employee";
import { useDispatch, useSelector } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function EditUser() {
  const { userDetail } = useSelector(({ USER }) => USER);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [email, setemail] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setlastNameError] = useState("");
  const [idError, setidError] = useState("");
  const [emailError, setemailError] = useState("");
  console.log(firstName);
  useEffect(() => {
    if (userDetail) {
      setFirstName(userDetail ? userDetail.first_name : "");
      setemail(userDetail ? userDetail.email : "");
      setLastName(userDetail ? userDetail.last_name : "");
      setId(userDetail ? userDetail.id : "");
    }
  }, [userDetail]);

  const handelRedirect = () => {
    navigate("/");
    setFirstName("");
    setemail("");
    setLastName("");
    setId("");
  };
  const handelsinup = () => {
    if (firstName === "" || !firstName) {
      setFirstNameError("This feiles id required");
    }
    if (email === "" || !email) {
      setemailError("This feiles id required");
    }
    if (lastName === "" || !lastName) {
      setlastNameError("This feiles id required");
    }
    if (id === "" || !id) {
      setidError("This feiles id required");
    }
    if (firstName && id && lastName && email) {
      let obj = {
        id: id,
        email: email,
        first_name: firstName,
        last_name: lastName,
      };
      if (userDetail) {
        dispatch(
          editUserList(userDetail.id, obj, handelRedirect, () =>
            dispatch(getEmployeeList())
          )
        );
      } else {
        dispatch(
          addUser(obj, handelRedirect, () => dispatch(getEmployeeList()))
        );
      }
    }
  };
  return (
    <div>
      <Container
        maxWidth="sm"
        sx={{
          "&.MuiContainer-root": {
            maxWidth: "800px",
          },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "500px",
            "& > :not(style)": { m: 1, width: "25ch", mt: "40px" },
            marginLeft: "60px",
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" component="h2">
            {userDetail ? "Edit Employee" : "Add Employee"}
          </Typography>
          <div style={{ marginTop: "40px", marginLeft: "100px" }}>
            <div className="text">
              <TextField
                id="standard-basic"
                label="Id"
                variant="standard"
                onChange={(e) => setId(e.target.value)}
                value={id}
                helperText={idError}
              />
            </div>
            <div className="text">
              <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
                sx={{
                  "& .MuiFormControl-root MuiTextField-root": {
                    minWidth: "72% !important",
                  },
                }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError("");
                }}
                value={firstName}
                helperText={firstnameError}
              />
            </div>
            <div className="text">
              <TextField
                id="standard-basic"
                label="LastName"
                variant="standard"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                helperText={lastnameError}
              />
            </div>
            <div className="text">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                helperText={emailError}
              />
            </div>

            <Button
              variant="outlined"
              onClick={handelsinup}
              style={{ marginTop: "10px" }}
            >
              {userDetail ? "Edit" : "Add"}
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}

