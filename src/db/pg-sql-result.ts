export interface PgSqlResult {
  command: string;
  rowCount: number;
  rows: object[];
}