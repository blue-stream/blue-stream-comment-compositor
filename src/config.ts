export const config = {
    endpoints: {
        users: {
            rpc: {
                port: +(process.env.USERS_RPC_PORT || 6007),
                methods: {
                    GET_USERS_BY_IDS: 'getUsersByIds',
                },
            },
            port: +(process.env.USERS_PORT || 5007),
            hostname: process.env.USERS_HOST || 'http://localhost',
            api: process.env.USERS_API || '/api/user',
        },
        comments: {
            port: +(process.env.COMMENTS_PORT || 5003),
            hostname: process.env.COMMENTS_HOST || 'http://localhost',
            api: process.env.USERS_API || '/api/comment',
        },
        reactions: {
            rpc: {
                port: +(process.env.REACTIONS_RPC_PORT || 6001),
                methods: {
                    GET_REACTIONS_BY_RESOURCES: 'getReactionsByResources',
                    GET_USER_REACTIONS_BY_RESOURCES: 'getUserReactedResources',
                },
            },
            port: +(process.env.REACTIONS_PORT || 5004),
            hostname: process.env.REACTIONS_HOST || 'http://localhost',
            api: process.env.USERS_API || '/api/reaction',
        },
        videos: {
            port: +(process.env.VIDEOS_PORT || 5001),
            hostname: process.env.VIDEOS_HOST || 'http://localhost',
            api: process.env.USERS_API || '/api/video',
        },
    },
    server: {
        port: +(process.env.SERVER_PORT || 7002),
        hostname: process.env.SERVER_HOST || 'http://localhost',
        name: process.env.SERVER_NAME || 'blue-stream-comment-compositor',
    },
    logger: {
        elasticsearch: process.env.LOGGER_ELASTICSEARCH && {
            hosts: process.env.LOGGER_ELASTICSEARCH.split(','),
        },
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost'],
    },
    authentication: {
        required: process.env.AUTHENTICATION_REQUIRED || true,
        secret: process.env.SECRET_KEY || 'bLue5tream@2018',
    },
    apm: {
        server: process.env.APM_SERVER || 'http://apm:8200',
        isActive: process.env.APM_ACTIVE || true,
    }
};
