import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import rantRoutes from './routes/rantRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(morgan("dev"));


app.use('/api/rants', rantRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


