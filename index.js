const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const config = require('config');

const server = new Hapi.server(config.get('server'), { routes: { cors: true }});

const jwtSecret = process.env.JWT_SECRET;

const adminUser = {
    id: 1,
    name: 'Admin',
    username: 'admin',
    password: 'e2b7101fdf5bd976f445733df1c03008',
};

exports.adminUser = adminUser;

const validate = async decoded => ({ isValid: !!decoded });

const init = async () => {

    const { host, port, database } = config.get('mongodb');

    await mongoose.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true });

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
