import { GET_USERSLIST, SET_USER } from "../../Actiontype.js";
import axios from "../../services/jwt/config.js";

export const getEmployeeList = () => {
  return (dispatch) => {
    axios.get("users").then((data) => {
      dispatch({ type: GET_USERSLIST, payload: data.data.data });
    });
  };
};
export const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: SET_USER, payload: user });
  };
};
export const addUser = (user, callBack, list) => {
  return (dispatch) => {
    axios.post(`users`, user).then((res) => {
      console.log(res);
      if (callBack) callBack();
      if (list) list();
    });
  };
};

export const editUserList = (id, user, callBack, list) => {
  return (dispatch) => {
    axios.post(`users/${id}`, user).then((res) => {
      console.log(res);
      if (callBack) callBack();
      if (list) list();
    });
  };
};

export const deleteUser = (id, callBack) => {
  return (dispatch) => {
    axios.post(`users/${id}`).then((res) => {
      console.log(res);
      setTimeout(() => {
        if (callBack) callBack();
      }, 1000);
    });
  };
};
