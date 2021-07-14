/**
 * Reverse proxy "cross-domain" settings
 */

module.exports = {
    '/open-weather': {
        proxyName: "",
        target: 'https://api.openweathermap.org/',
        changeOrigin: true,
    }
}