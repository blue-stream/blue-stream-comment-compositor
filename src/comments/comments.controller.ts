import { Request, Response } from 'express';
import { ReactionsRpc } from '../reactions/reactions.rpc';
import { UsersRpc } from '../users/users.rpc';
import { VideosService } from '../videos/videos.service';
import { CommentsService } from './comments.service';

export class CommentsController {
    static async getRootComments(req: Request, res: Response) {
        const comments = await CommentsService.getRoot(req.query, req.headers.authorization!);

        res.json(await CommentsController.expandCommentsInformation(comments));
    }

    static async getReplies(req: Request, res: Response) {
        const comments = await CommentsService.getReplies(req.params.parent, req.headers.authorization!);

        res.json(await CommentsController.expandCommentsInformation(comments));
    }

    private static async expandCommentsInformation(comments: any) {
        let expandedComments = comments;
        const usersIds = comments.map((comment: any) => comment.user);
        const reactionsResources = comments.map((comment: any) => comment.id);

        try {
            const users = await UsersRpc.getUsersByIds(usersIds);
            const reactions = await ReactionsRpc.getReactionsByResources(reactionsResources);
            const reactionsMap: { [resource: string]: Object } = {};

            reactions.forEach((reaction: any) => {
                reactionsMap[reaction.resource] = reaction.types;
            });

            expandedComments = comments.map((comment: any) => {
                return {
                    ...comment,
                    user: users[comment.user],
                    reactions: reactionsMap[comment.id],
                };
            });
        } finally {
            return expandedComments;
        }
    }

    static async create(req: Request, res: Response) {
        await VideosService.doesExist(req.body.resource, req.headers.authorization!);
        res.json(await CommentsService.create(req.body, req.headers.authorization!));
    }
}
