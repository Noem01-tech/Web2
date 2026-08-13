import {Pool} from "pg";

export const pool =new Pool({
    user: process.env.DB_USER,
  host: localHost,
  database:user_tag_note,
  password:17Novembre2003,
  port: 5432
})