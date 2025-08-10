import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';            console.log("Database initialized successfully");
    } catch (error) {
        console.error("Database initialization error:", error);
        // Don't exit the process, just log the error
    }
}

initDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
}).catch((error) => {
    console.error("Failed to initialize database:", error);
    // Still start the server even if DB init fails
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} (DB connection failed)`);
    });
}); from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// import {aj} from './lib/arcjet.js';  
import rantRoutes from './routes/rantRoutes.js';
import {sql} from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

console.log('Starting server with PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Database host:', process.env.PGHOST ? 'configured' : 'missing');

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
app.use('/api/auth', authRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    // Handle React Router - serve index.html for non-API routes
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

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
        await sql`
            CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username varchar(50) NOT NULL UNIQUE,
            password_hash varchar(255) NOT NULL)
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


