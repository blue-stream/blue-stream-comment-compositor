import * as proxy from 'http-proxy-middleware';
import { config } from './config';

const commentsApi: string = `${config.endpoints.comments.hostname}:${config.endpoints.comments.port}`;

const CommentsProxy = proxy({ target: commentsApi });

export { CommentsProxy };
