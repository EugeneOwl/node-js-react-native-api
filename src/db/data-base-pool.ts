import { sqlParameter } from './sql-parameter';
import { PgSqlResult } from './pg-sql-result';

const { Pool } = require('pg');

export class DataBasePool {

  private pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
  });

  private emptySqlResult: PgSqlResult = { command: '', rowCount: 0, rows: [] };

  async query(sql: string, params: sqlParameter[] = []): Promise<PgSqlResult> {
    try {
      return await this.pool.query(sql, params);
    } catch (e) {
      console.error('Can not execute query to database: ', e.message);
      return this.emptySqlResult;
    }
  }
}

const databasePool = new DataBasePool();

export { databasePool };
