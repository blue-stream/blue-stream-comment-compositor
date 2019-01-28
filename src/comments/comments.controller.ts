import { Request, Response } from 'express';
import { ReactionsRpc } from '../reactions/reactions.rpc';
import { UsersRpc } from '../users/users.rpc';
import { VideosService } from '../videos/videos.service';
import { CommentsService } from './comments.service';

export class CommentsController {
    static async getRootComments(req: Request, res: Response) {
        const comments = await CommentsService.getRoot(req.query, req.headers.authorization!);
        res.json(await CommentsController.expandCommentsInformation(comments, req.user.id));
    }

    static async getReplies(req: Request, res: Response) {
        const comments = await CommentsService.getReplies(req.params.parent, req.headers.authorization!);
        res.json(await CommentsController.expandCommentsInformation(comments, req.user.id));
    }

    private static async expandCommentsInformation(comments: any, user: string) {
        const usersIds = comments.map((comment: any) => comment.user);
        const reactionsResources = comments.map((comment: any) => comment.id);

        const results = await Promise.all([
            UsersRpc.getUsersByIds(usersIds).catch(e => undefined),
            ReactionsRpc.getReactionsByResources(reactionsResources).catch(e => undefined),
            ReactionsRpc.getUserReactedResources(reactionsResources, user).catch(e => undefined),
        ]);

        const [users, reactions, reactedResources] = results;

        const reactionsMap: { [resource: string]: Object } = {};
        const reactedResourcesMap: { [resource: string]: string } = {};

        reactions.forEach((reaction: any) => {
            reactionsMap[reaction.resource] = reaction.types || undefined;
        });

        reactedResources.forEach((reaction: any) => {
            reactedResourcesMap[reaction.resource] = reaction.type;
        });

        return comments.map((comment: any) => {
            return {
                ...comment,
                user: users ? users[comment.user] : comment.user,
                reactions: reactionsMap[comment.id] || undefined,
                reaction: reactedResourcesMap[comment.id] || undefined,
            };
        });
    }

    static async create(req: Request, res: Response) {
        await VideosService.doesExist(req.body.resource, req.headers.authorization!);
        res.json(await CommentsService.create(req.body, req.headers.authorization!));
    }
}
