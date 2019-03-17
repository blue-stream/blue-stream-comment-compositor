import * as express from 'express';
import { log } from '../logger';
import { AxiosError } from 'axios';

export function errorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        log('warn' , 'AxiosError', `${error.name} was thrown with status ${axiosError.response!.status} and message ${axiosError.response!.statusText}`, '', req.user ? req.user.id : 'unknown');

        res.status(axiosError.response!.status).send();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    log('error' , 'Unknown Error', `${error.name} was thrown with status 500 and message ${error.message}`, '', req.user ? req.user.id : 'unknown');

    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
