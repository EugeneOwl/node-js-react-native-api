import { TaskStatus } from "../../src/models/task/task-status";
import { BaseHttpError } from "../../src/errors/base-http-error";
import { UserListDatabaseRow } from "../../src/models/user/user-database-row";
import { UserListItem } from "../../src/models/user/user-list-model";

class UserListTransformer {

  listDatabaseRowToList(listDatabaseRow: UserListDatabaseRow[]): UserListItem[] {
    const userList: UserListItem[] = [];

    listDatabaseRow.forEach((row: UserListDatabaseRow) => {
      const indexInList = userList.findIndex(listItem => listItem.id === row.id);
      if (indexInList === -1) {
        this.pushToUserList(row, userList);
      } else {
        this.updateIntoUserList(row, userList, indexInList);
      }
    });

    return userList;
  }

  private pushToUserList(row: UserListDatabaseRow, userList: UserListItem[]): void {
    const userListItem: UserListItem = this.buildUserListItem(row);
    userList.push(userListItem);
  }

  private buildUserListItem(row: UserListDatabaseRow): UserListItem {
    return {
      id: row.id,
      avatar: row.avatar,
      username: row.username,
      tasksToPerform: row.task_status === TaskStatus.TO_PERFORM ? parseInt(row.tasks_count, 10) : 0,
      tasksInProgress: row.task_status === TaskStatus.IN_PROGRESS ? parseInt(row.tasks_count, 10) : 0
    }
  }

  private updateIntoUserList(row: UserListDatabaseRow, userList: UserListItem[], index: number): void {
    if (row.task_status === TaskStatus.TO_PERFORM) {
      userList[index].tasksToPerform = parseInt(row.tasks_count, 10);
    } else if (row.task_status === TaskStatus.IN_PROGRESS) {
      userList[index].tasksInProgress = parseInt(row.tasks_count, 10);
    }
  }
}

const userListTransformer = new UserListTransformer();

export { userListTransformer }
