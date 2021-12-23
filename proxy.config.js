const PROXY_CONFIG = {
    '/rest': {
        target: location.hostname,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
    },
    '/init': {
        target: location.hostname,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
    },
    '/websocket': {
        target: `${location.hostname}/bicirio-websocket`,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
    }
};

module.exports = PROXY_CONFIG;