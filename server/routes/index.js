var __nuxt = require('./nuxt')

/**
 * 路由入口文件
 * @param {*} app Express实例
 */
module.exports = function (app) {
    app.use('/nuxt', __nuxt);
}
