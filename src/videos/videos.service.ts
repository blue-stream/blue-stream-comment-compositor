import { HttpClient } from '../utils/http.client';
import { config } from '../config';

export class VideosService {
    static api: string = `${config.endpoints.videos.hostname}:${config.endpoints.videos.port}${config.endpoints.videos.api}`;

    static doesExist(videoId: string, authorizationHeader: string) {
        return HttpClient.head(`${VideosService.api}/${videoId}`, null, authorizationHeader);
    }
}
