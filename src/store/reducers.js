export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      };
    case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "ACCOUNT_LOADED":
      return {
        ...state,
        account: action.account,
      };
    case "CONFIG_LOADED":
      return {
        ...state,
        config: action.config,
      };

    default:
      return state;
  }
};

export const tasks = (state = {}, action) => {
  switch (action.type) {
    case "TASKS_LOADED":
      return {
        ...state,
        alltasks: {
          data: action.allTasks,
        },
      };
    default:
      return state;
  }
};
