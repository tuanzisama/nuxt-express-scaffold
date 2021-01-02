/**
 * 枚举文件
 * @description 工程枚举文件
 */

var lodash_get = require('lodash/get')

const _enumList = {
    "SOME_ENUM_LIST": [
        { key: "0", value: "张三" },
        { key: "1", value: "李四" },
    ],

}
/**
 * 通过此方法获取枚举值
 * @param {*} keyName KEY键
 * @param {*} defVal 无法寻到此值时的默认值，不传则为空字符串
 */
exports = module.exports =  function (keyName, defVal) {
    return lodash_get(_enumList, keyName, defVal || "")
}