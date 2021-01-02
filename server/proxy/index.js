var express = require('express');
var router = express.Router();
var config = require('./config')
var isPlainObject = require('lodash/isPlainObject')
var { createProxyMiddleware } = require("http-proxy-middleware");
var contants = require('../../utils/common/constant')
const proxyPrefix = contants("REVERSE_PROXY_PREFIX", '')
const configList = new Map(Object.entries(config))

if (process.env.APP_ENV === 'DEVELOPMENT') {
    let arr = new Array()
    let proxyList = configList.forEach((value, key) => {
        arr.push(`<ul><li><a href="/${proxyPrefix}${key}" target="_blank">${key}</a></li></ul>`)
    })
    router.get('/', function (req, res) {
        res.send(`Reverse proxy started successfully!<br/>${arr.join('')}`)
    })
}

configList.forEach((value, key) => {
    let rewriteConfig = {
        [`^/${proxyPrefix}${key}`]: '',
    }
    value.pathRewrite = isPlainObject(value.pathRewrite) ? Object.assign(value.pathRewrite, rewriteConfig) : rewriteConfig
    router.all([key, `${key}/*`], createProxyMiddleware.call(null, value))
})


module.exports = function (app) {
    app.use(`/${proxyPrefix}`, router);
}