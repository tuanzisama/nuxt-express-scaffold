/**
 * 中端入口代码
 * @author tuanzisama <tuanzi@hatsunemiku.club> 
 */
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const { Nuxt, Builder } = require('nuxt')
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
var getLocalIp = require('./utils/get-localip');
var Env = require('./utils/env');
const portChecker = require('./utils/port-checker.js');

/**
 * 中间件
 */
function _middleware() {
    /**
     * request参数转换
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    /**
     * 全局中间件，设置HTTP头等
     */
    app.use('*', function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", true)
        // res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, cookiejar')
        if (req.method == 'OPTIONS') {
            res.sendStatus(200)
        } else {
            next()
        }
    });

}

function _exceptionCatch() {
    /**
     * catch 404 and forward to error handler
     */
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(err.status);
        res.send("404 Not Found");
    });

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        res.send(err.status);
        next()
    });
}
/**
 * 路由
 */
function _router() {
    require('./proxy')(app);
    require('./routes')(app);
}

async function start() {
    try {
        const host = config.server.host
        const port = Env('SERVICE_PORT', config.server.port)

        var portAvailable = await portChecker(port)
        if (portAvailable === false) throw console.error(" ERROR ".bgRed, `Port [${port}] is unavailable.`)

        app.listen(port, host)
        // Instantiate nuxt.js


        const isProd = process.env.APP_ENV !== 'DEVELOPMENT'

        const nuxt = new Nuxt(Object.assign(config, {
            dev: !isProd,
        }))

        // Build only in dev mode
        if (config.dev) {
            const builder = new Builder(nuxt);
            await builder.build();
        } else {
            await nuxt.ready();
        }


        _middleware()
        _router()
        app.use(nuxt.render)
        _exceptionCatch()
        if (config.dev) getLocalIp(port)
    } catch (error) {
        console.error(" ERROR ".bgRed, `An unexpected error occurred when starting the service.`)
        console.error(error);
        // 让调用此函数的时候无视nodejs的 Unhandled promise rejection. 接管报错
        return Promise.resolve()
    }
}

start()