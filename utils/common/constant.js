/**
 * 枚举文件
 * @description 工程常量列表文件
 */

var lodash_get = require('lodash/get')

const _constantList = {
    BASIC_ZINDEX: 3000,
    // 定义反向代理前缀 Define reverse proxy prefix
    REVERSE_PROXY_PREFIX: '/proxy'
}

/**
 * 通过此方法获取常量值
 * @param {*} keyName KEY键
 * @param {*} defVal 无法寻到此值时的默认值，不传则为空字符串
 */
exports = module.exports = function (keyName, defVal) {
    return lodash_get(_constantList, keyName, defVal || "")
}