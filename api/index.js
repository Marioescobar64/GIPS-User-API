import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { corsOptions } from '../configs/cors-configuration.js';
import { errorHandler } from '../middlewares/handle-errors.js';

import studentRoutes from '../src/student/student-routes.js';
import practiceRoutes from '../src/practice/practice-routes.js';
import evidenceRoutes from '../src/evidence/evidence-routes.js';
import reposteRoutes from '../src/reposteHoursmodel/reposteHours-routes.js';
import reviewRoutes from '../src/review/review-routes.js';

const BASE_URL = '/GIPS/v1';

let isConnected = false;

async function connectDB() {
    if (isConnected && mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.URI_MONGODB, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
    });
    isConnected = true;
}

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cors(corsOptions));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Demasiadas solicitudes, intenta de nuevo mas tarde' }
}));

app.use(async (req, res, next) => {
    try {
        await connectDB();
    } catch (error) {
        return res.status(500).json({ error: 'Database connection failed' });
    }
    next();
});

app.use(`${BASE_URL}/student`, studentRoutes);
app.use(`${BASE_URL}/practice`, practiceRoutes);
app.use(`${BASE_URL}/evidence`, evidenceRoutes);
app.use(`${BASE_URL}/reposte`, reposteRoutes);
app.use(`${BASE_URL}/review`, reviewRoutes);

app.get(`${BASE_URL}/health`, (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'GIPS User API',
        version: '1.0.0'
    });
});

app.use(errorHandler);

export default async function handler(req, res) {
    return app(req, res);
}
