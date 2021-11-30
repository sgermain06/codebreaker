const { DefinePlugin } = require('webpack');
const config = require('config');

module.exports = function override(cfg, env) {
    cfg.plugins.push(
        new DefinePlugin({
            $config: JSON.stringify(config.get('frontend') || {})
        })
    );
    return cfg;
}