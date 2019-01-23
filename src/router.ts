import { Router } from 'express';
import { CommentsRouter } from './comments/comments.router';
import { config } from './config';

const AppRouter: Router = Router();

AppRouter.use(config.endpoints.comments.api, CommentsRouter);

export { AppRouter };
