import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'P_SIS_INFOR_1',
  password: 'Pfev13C!',
  port: 3999,
});

export default pool;