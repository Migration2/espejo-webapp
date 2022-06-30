const PROXY_CONFIG = {
    '/rest': {
        target: location.hostname,
        // target: "http://localhost:4444",
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
    },
    '/init': {
        target: location.hostname,
        // target: "http://localhost:4444",
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
    },
    '/websocket': {
        target: `${location.hostname}/bicirio-websocket`,
        // target: `http://bici-ceja.com:4547/bicirio-websocket`,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
    }
};

module.exports = PROXY_CONFIG;