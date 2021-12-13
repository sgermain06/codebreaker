const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const config = require('config');

const Player = require('./api/models/players');

const server = new Hapi.server({
    ...config.get('server')
});

const jwtSecret = process.env.JWT_SECRET;

const adminUser = {
    id: 1,
    name: 'Admin',
    username: 'admin',
    password: 'e2b7101fdf5bd976f445733df1c03008',
};

exports.adminUser = adminUser;

const validate = async decoded => {

    if (decoded.id !== adminUser.id) {
        const user = await Player.getById(decoded.id);
        if (!user || user.deleted) {
            return { isValid: false };
        }
    }

    return { isValid: !!decoded };
};

const init = async () => {

    const { host, port, database, username } = config.get('mongodb');
    const passwd = process.env.MONGO_PASSWORD;

    const mongoUrl = new URL(`mongodb://${host}:${port}/${database}`);
    mongoUrl.username = username;
    mongoUrl.password = passwd;

    try {
        await mongoose.connect(mongoUrl.href, { useNewUrlParser: true });
    }
    catch (err) {
        console.error(err);
    }

    // Need to register this alone before registering openapi,
    // so the jwt security option becomes available.
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
        key: jwtSecret,
        validate,
        verifyOptions: {
            algorithms: ['HS256'],
        }
    });

    await server.register([
        {
            plugin: require('hapi-openapi'),
            options: {
                api: './api/swagger/swagger.yaml',
                handlersPath: './api/controllers',
                docs: {
                    path: '/api-docs',
                },
                cors: {
                    origin: ['*']
                },
            }
        },
        require('inert'),
        require('vision'),
        {
            plugin: require('hapi-swaggered-ui'),
            options: {
                title: 'Codebreaker API',
                path: '/docs',
                swaggerEndpoint: '/api/v1/api-docs',
                swaggerOptions: {
                    docExpansion: 'list',
                },
            },
        }
    ]);

    await server.start();
    console.log(server.info.uri);
};

init().catch(console.error);
