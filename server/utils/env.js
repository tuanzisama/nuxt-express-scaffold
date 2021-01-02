
const env = process.env.APP_ENV || "PRODUCTION"
var lodash_get = require('lodash/get')



/**
 * 通过此方法获取常量值
 * @param {*} keyName KEY键
 * @param {*} defVal 无法寻到此值时的默认值，不传则为空字符串
 */
module.exports = function (keyName, defVal) {
    return lodash_get(_getEnvList(), keyName, defVal || "")
}
/**
 * 获取当前环境变量
 */
function _getEnvList() {
    let allowEnv = new Object()
    let envList = process.env
    new Map(Object.entries(envList)).forEach((value, key) => {
        if (key.includes(env) || key.includes('COMMON')) {
            let finallyKey = key.replace(`${env}_`, '')
            Object.assign(allowEnv, { [finallyKey]: value })
        }
    })
    return { APP_ENV: env, ...allowEnv }
}