const axios = require('axios');

module.exports = {
    get: async (req) => {
        console.log('Hello');
        try {
            console.log('Querying:', req.query.url);
            const response = await axios.get(req.query.url);
            return response.data;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    },
    post: () => {
        return { swagger: '2.0', info: { title: 'About', version: '1.0.0' }, host: 'localhost:3000', basePath: '/api', paths: {}, definitions: {}, securityDefinitions: {}, security: [], tags: [], externalDocs: {} };
    }
}