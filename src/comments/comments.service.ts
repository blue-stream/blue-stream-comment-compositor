import { HttpClient } from '../utils/http.client';
import { config } from '../config';

export class CommentsService {
    static api: string = `${config.endpoints.comments.hostname}:${config.endpoints.comments.port}${config.endpoints.comments.api}`;

    static getRoot(query: any, authorizationHeader: string) {
        return HttpClient.get(`${CommentsService.api}/root`, query, authorizationHeader);
    }

    static getReplies(parent: string, authorizationHeader: string) {
        return HttpClient.get(`${CommentsService.api}/${parent}/replies`, null, authorizationHeader);
    }

    static create(body: any, authorizationHeader: string) {
        return HttpClient.post(`${CommentsService.api}`, body, authorizationHeader);
    }
}
