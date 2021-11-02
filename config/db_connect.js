import dotenv from 'dotenv';
import knexjs from 'knex';
dotenv.config();

const knex = new knexjs({
    client: process.env.DB_CONNECTION,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
});

export default knex;