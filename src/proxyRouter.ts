import { Router } from 'express';
import { CommentsProxy } from './proxies';
import { config } from './config';

const AppProxyRouter: Router = Router();

AppProxyRouter.use(config.endpoints.comments.api, CommentsProxy);

export { AppProxyRouter };
