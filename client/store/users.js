import axios from "axios";

const FETCH_USERS = "FETCH_USERS";

const _fetchUsers = (users) => {
  return {
    type: FETCH_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const { data: users } = await axios.get(`/api/users`);
    dispatch(_fetchUsers(users));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
};
