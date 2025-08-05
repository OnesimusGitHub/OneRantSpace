import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
// import {aj} from './lib/arcjet.js';  
import rantRoutes from './routes/rantRoutes.js';
import {sql} from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(morgan("dev"));


/*
app.use(async(req, res, next) => {
try {
    const decision = await aj.protect(req, {
        requested: 1,
    });
    if (decision.isDenied) {
        if (decision.reason.isRateLimit()) {
            res.status(429).json({error: "Too many requests, please try again later."});
        } else if (decision.reason.isBot()) {
            res.status(403).json({error: "Access denied for bots."});
        }
        else {
                res.status(403).json({error: "Access denied."});
            }
        return;
        }
        if (decision.result.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
                res.status(403).json({error: "Access denied for bots or spoofed requests."});
                return;
            }
                next();
        }catch (error) {
            console.log("Arcjet error:", error);
            next(error);
        }
});
*/

app.use('/api/rants', rantRoutes);


async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS rants (
            rant_id SERIAL PRIMARY KEY,
            header varchar(255) NOT NULL,
            content text NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            youtube_url text not null)
            `;

            
            console.log("Database initialized successfully");
    } catch (error) {
        console.log("error initdb", error);
        
    }
}

initDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


