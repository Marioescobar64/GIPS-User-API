'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { errorHandler } from '../middlewares/handle-errors.js';

const BASE_URL = '/GIPS/v1';

import studentRoutes from '../src/student/student-routes.js';
import practiceRoutes from '../src/practice/practice-routes.js';
import evidenceRoutes from '../src/evidence/evidence-routes.js';
import reposteRoutes from '../src/reposteHoursmodel/reposteHours-routes.js';
import reviewRoutes from '../src/review/review-routes.js';

const middlewares = (app) => {
    app.use(helmet());
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: { success: false, message: 'Demasiadas solicitudes, intenta de nuevo más tarde' }
    }));
}

const routes = (app) => {
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
}

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3002;

    try {
        dbConnection();
        middlewares(app);
        routes(app);

        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

    } catch (error) {
        console.log(error);
    }
}

export { initServer };
