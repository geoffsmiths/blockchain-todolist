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

export const contract = (state = {}, action) => {
  switch (action.type) {
    case "CONTRACT_LOADED":
      return {
        ...state,
        contract: action.contract,
      };
    default:
      return state;
  }
};

const DEFAULT_TASK_STATE = {
  transaction: {
    isSuccessful: false,
  },
};

export const tasks = (state = DEFAULT_TASK_STATE, action) => {
  switch (action.type) {
    case "TASKS_LOADED":
      return {
        ...state,
        alltasks: {
          data: action.allTasks,
        },
      };
    case "TASK_CREATED":
      return {
        ...state,
        task: action.task,
        transaction: {
          isSuccessful: true,
        },
      };
    case "TASK_CREATE_FAIL":
      return {
        ...state,
        transaction: {
          isSuccessful: false,
        },
      };
    default:
      return state;
  }
};
