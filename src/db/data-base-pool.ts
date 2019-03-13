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

  async query(sql: string, params: sqlParameter[] = []): Promise<PgSqlResult> {
    return await this.pool.query(sql, params);
  }
}

const databasePool = new DataBasePool();

export { databasePool };
