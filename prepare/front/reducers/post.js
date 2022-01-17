import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  mainPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
