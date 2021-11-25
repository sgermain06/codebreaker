const Hapi = require('@hapi/hapi');

const server = new Hapi.server({ host: '0.0.0.0', port: 5000 });

const init = async () => {
    await server.register({
        plugin: require('hapi-openapi'),
        options: {
            api: './api/swagger/swagger.yaml',
            handlersPath: './api/controllers',
        }
    });
    await server.start();
    console.log(server.info.uri);
};

init();
