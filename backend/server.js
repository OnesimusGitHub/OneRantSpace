import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import rantRoutes from './routes/rantRoutes.js';
import {sql} from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(morgan("dev"));


app.use('/api/rants', rantRoutes);


async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS rants (
            rant_id SERIAL PRIMARY KEY,
            header varchar(255) NOT NULL,
            content text NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            `
    } catch (error) {
        
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


