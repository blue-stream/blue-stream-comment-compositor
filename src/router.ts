import { Router } from 'express';
import { CommentsRouter } from './comments/comments.router';
import { config } from './config';
import { HealthRouter } from './utils/health/health.router';

const AppRouter: Router = Router();

AppRouter.use(config.endpoints.comments.api, CommentsRouter);
AppRouter.use('/health', HealthRouter);

export { AppRouter };
