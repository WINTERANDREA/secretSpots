const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
    case "CREATE_DRAFT":
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0,
        },
      };
    case "UPDATE_DRAFT_POSITION":
      return {
        ...state,
        draft: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
