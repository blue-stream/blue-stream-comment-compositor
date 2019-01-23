import { Router } from 'express';
import { CommentsController } from './comments.controller';
import { Wrapper } from '../utils/wrapper';

const CommentsRouter: Router = Router();

CommentsRouter.get('/root', Wrapper.wrapAsync(CommentsController.getRootComments));
CommentsRouter.get('/:parent/replies', Wrapper.wrapAsync(CommentsController.getReplies));
CommentsRouter.post('/', Wrapper.wrapAsync(CommentsController.create));

export { CommentsRouter };
