module.exports = ({
    domain: 'google.com',
    subdomains: {
        'www': '93.19.131.712',
        'resources': '93.19.131.792',
        'news': '123.19.131.312',
        'maps': '81.19.131.662',
        'mail': '193.19.131.302',
    },
    vulnerabilities: {
        '93.19.131.712': [
            {
                name: 'Unsafe root password',
                description: 'The root password is not encrypted.',
            },
            {
                name: 'Unsecure web server',
                description: 'Running nginx 1.12.3 with 0-day exploit',
            }
        ]
    }
});