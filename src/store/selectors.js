import { createSelector } from "reselect";
import { get } from "lodash";

const account = (state) => get(state, "provider.account");
const tasks = (state) => get(state, "tasks.alltasks.data");

export const myTasksSelector = createSelector(
  account,
  tasks,
  (account, tasks) => {
    if (!tasks) {
      return;
    }

    tasks = tasks.filter((o) => o.user === account);

    return tasks;
  }
);
