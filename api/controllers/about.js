module.exports = {
    get: () => {
        return { about: 'About page' };
    },
    swaggerDefinition: () => {
        return { swagger: '2.0', info: { title: 'About', version: '1.0.0' }, host: 'localhost:3000', basePath: '/api', paths: {}, definitions: {}, securityDefinitions: {}, security: [], tags: [], externalDocs: {} };
    }
}