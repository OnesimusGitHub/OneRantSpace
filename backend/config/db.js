import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();


const {PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT} = process.env;


export const sql = neon(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require `,
)