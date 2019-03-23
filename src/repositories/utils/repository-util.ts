import { databasePool } from "../../db/data-base-pool";

class RepositoryUtil {

  async getVacantId(seqName: string, tableName: string): Promise<any> {
    const { rows } = await databasePool.query(
      `SELECT setval('${ seqName }', (SELECT MAX(id) FROM ${ tableName }) + 1)`
    );
    // @ts-ignore
    return await rows[0]['setval'] as number;
  }


}

const repositoryUtil = new RepositoryUtil();

export { repositoryUtil }
