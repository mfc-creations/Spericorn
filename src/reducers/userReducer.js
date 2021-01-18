import {
  COUNTRIES_FETCHED,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  loading: false,
  countriesList: [],
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COUNTRIES_FETCHED:
      return {
        ...state,
        countriesList: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case EDIT_USER:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.payload.index),
          action.payload.data,
          ...state.users.slice(action.payload.index + 1),
        ],
      };
    case DELETE_USER:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.payload),
          ...state.users.slice(action.payload + 1),
        ],
      };
    default:
      return state;
  }
}
