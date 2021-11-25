module.exports = ({
    domain: 'facebook.com',
    subdomains: {
        'www': '88.191.44.785',
        'cdn': '156.83.911.84',
        'people': '88.191.44.785',
        'groups': '1.2.3.456',
    },
    vulnerabilities: {
        '156.83.911.84': [
            {
                name: 'Unsecure endpoint',
                service: 'Hadoop',
                version: '2.6.3',
                description: 'The HDFS endpoint is unsecured.',
            }
        ],
        '1.2.3.456': [
            {
                name: 'No Firewall',
                service: 'Firewall',
                version: '1.0.0',
                description: 'The firewall is not configured.',
            },
            {
                name: 'Exposed services',
                service: 'File Server',
                version: '1.0.0',
                description: 'The file server is exposed.',
            },
            {
                name: 'Exposed services',
                service: 'Active Directory',
                version: '14.12.1-developerPreview',
                description: 'The Active Directory is exposed. (lol)',
            }
        ]
    }
});