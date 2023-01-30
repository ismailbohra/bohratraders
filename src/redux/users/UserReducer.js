import {
  DELETE_USER_RESP,
  GET_NEW_USER_RESP,
  GET_USER_LIST_RESP,
  UPDATE_USER_RESP,
  USER_LOGIN_EMAIL_RESP,
} from "./UserType";

const INITIAL_STATE = {
  userProfile: {
    id: "",
    name: "",
    email: "",
  },
  userList: [],
};

const setUser = (state, action) => {
  const userProfile = {
    id: action.payload.data.staffId || "",
    name: action.payload.data.name || "",
    email: action.payload.data.email || "",
  };
  return {
    ...state,
    userProfile: userProfile,
  };
};
const updateUser = (state, action) => {
  const userProfile = {
    id: action.payload.id || "",
    name: action.payload.name || "",
    email: action.payload.email || "",
  };
  return {
    ...state,
    userProfile: userProfile,
  };
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case USER_LOGIN_EMAIL_RESP:
      return setUser(state, action);
    case GET_USER_LIST_RESP:
      return {
        ...state,
        userList: action.payload,
      };
    case DELETE_USER_RESP:
      return {
        ...state,
        userList: state.userList.filter((id) => id !== action.payload),
      };
    case GET_NEW_USER_RESP:
      return setUser(state, action);
    case UPDATE_USER_RESP:
      return updateUser(state, action);
    default:
      return state;
  }
};
