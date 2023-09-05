export const tasks = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      };
    case "TASKS_LOADED":
      return {
        ...state,
        alltasks: {
          data: action.allTasks,
        },
      };
    default:
      return false;
  }
};
