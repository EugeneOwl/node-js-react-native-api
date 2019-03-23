import { UserDetailsDatabaseRow } from "../../src/models/user/user-database-row";
import { UserDetails } from "../../src/models/user/user-model";
import { durationProcessorUtil } from "../../src/services/utils/duration-processor-util";

class UserDetailsTransformer {

  detailsDatabaseRowToDetails(detailsDatabaseRows: UserDetailsDatabaseRow[]): UserDetails {

    const userDetails: UserDetails = {
      id: detailsDatabaseRows[0].id,
      username: detailsDatabaseRows[0].username,
      avatar: detailsDatabaseRows[0].avatar,
      teams: detailsDatabaseRows[0].team_name ? [ detailsDatabaseRows[0].team_name ] : [],
      role: detailsDatabaseRows[0].role_name,
      timeLogged: durationProcessorUtil.stringToUiFormat(detailsDatabaseRows[0].time_logged),
    };

    // If user belongs to more then 1 team
    if (detailsDatabaseRows.length > 1) {
      userDetails.teams = detailsDatabaseRows.map(row => row.team_name);
    }

    return userDetails;
  }
}

const userDetailsTransformer = new UserDetailsTransformer();

export { userDetailsTransformer }
