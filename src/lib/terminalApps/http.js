const axios = require('axios');
const { isEmpty } = require('lodash');

export default class HttpRequest {

    constructor(terminal, options = {}) {
        this.terminal = terminal;
        this.options = options;
    }

    async run(url, ...args) {
        if (isEmpty(url)) {
            throw new Error('URL is required.');
        }

        this.terminal.stdout(`Requesting GET from ${url}...`);
        // const loader = [ ' ⠷', ' ⠯', ' ⠟', ' ⠻', ' ⠽', ' ⠾' ];
        const loader = [ ' [o---]', ' [-o--]', ' [--o-]', ' [---o]', ' [--o-]', ' [-o--]' ];
        return await this.terminal.withLoader(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.get(`${$config.endpoint}/api/v1/request?url=${url}`);
            this.terminal.log(response.data);
            this.terminal.stdout('');
        }, loader);
    }
}