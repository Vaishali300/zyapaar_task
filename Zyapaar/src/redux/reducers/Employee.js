import { GET_USERSLIST, SET_USER } from "../../Actiontype.js";
const INIT_STATE = {
  user: [],
  userDetail: null,
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERSLIST: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        userDetail: action.payload,
      };
    }
    default:
      return state;
  }
};
