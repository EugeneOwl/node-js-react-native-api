import { TeamListDatabaseRow, TeamListItem, TeamListItemMember } from "../src/models/team/team-list-model";
import moment from 'moment'
import { durationProcessorUtil } from "../src/services/utils/duration-processor-util";

class TeamListTransformer {

  listDatabaseRowToList(listDatabaseRow: TeamListDatabaseRow[]): TeamListItem[] {
    const teamList: TeamListItem[] = [];

    listDatabaseRow.forEach((row: TeamListDatabaseRow) => {
      const indexInList = teamList.findIndex(listItem => listItem.id === row.id);
      if (indexInList === -1) {
        this.pushToTeamList(row, teamList);
      } else {
        this.insertIntoTeamList(row, teamList, indexInList);
      }
    });

    return teamList;
  }

  private pushToTeamList(row: TeamListDatabaseRow, teamList: TeamListItem[]): void {
    const member: TeamListItemMember = this.extractTeamListItemMember(row);
    const teamListItem: TeamListItem = this.buildTeamListItem(row, [member]);
    teamList.push(teamListItem);
  }

  private extractTeamListItemMember(row: TeamListDatabaseRow): TeamListItemMember {
    return {
      id: row.member_id,
      username: row.member_name,
      timeLogged: row.member_time_logged,
      isTeamLeader: row.leader_id === row.member_id,
      role: row.member_role
    };
  }

  private buildTeamListItem(row: TeamListDatabaseRow, members: TeamListItemMember[]): TeamListItem {
    return {
      id: row.id,
      name: row.name,
      projectId: row.project_id,
      timeLogged: this.calculateTeamTimeLogged(members),
      members: members
    }
  }

  private insertIntoTeamList(row: TeamListDatabaseRow, teamList: TeamListItem[], index: number): void {
    const member: TeamListItemMember = this.extractTeamListItemMember(row);
    const currentListItem = teamList[index];
    currentListItem.members.push(member);
    currentListItem.timeLogged = this.calculateTeamTimeLogged(currentListItem.members);
    teamList[index] = currentListItem;
  }

  private calculateTeamTimeLogged(members: TeamListItemMember[]): string {
    const totalDuration = moment.duration();
    members.forEach(member => totalDuration.add(moment.duration(member.timeLogged)));

    return durationProcessorUtil.durationToUiFormat(totalDuration);
  }
}

const teamListTransformer = new TeamListTransformer();

export { teamListTransformer }
