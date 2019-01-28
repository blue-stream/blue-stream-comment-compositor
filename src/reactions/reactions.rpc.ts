import { config } from '../config';

const jayson = require('jayson/promise');

export class ReactionsRpc {
    private static rpcClient = jayson.Client.http(`${config.endpoints.reactions.hostname}:${config.endpoints.reactions.rpc.port}`);

    static async getReactionsByResources(resources: string[]) {
        const response = await ReactionsRpc.rpcClient.request(config.endpoints.reactions.rpc.methods.GET_REACTIONS_BY_RESOURCES, resources);
        return response.result;
    }

    static async getUserReactedResources(resources: string[], user: string) {
        const response = await ReactionsRpc.rpcClient.request(config.endpoints.reactions.rpc.methods.GET_USER_REACTIONS_BY_RESOURCES, { resources, user });
        return response.result;
    }
}
