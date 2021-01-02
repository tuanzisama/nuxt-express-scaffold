/**
 * 反向代理“跨域”设置
 */

// 在配置时，续携带
module.exports = {
    '/taobao-ip': {
        // 代理前缀
        proxyName: "",
        // 代理目标
        target: 'http://ip.taobao.com',
        changeOrigin: true,
    },
    '/taobao-ip2': {
        // 代理前缀
        proxyName: "",
        // 代理目标
        target: 'http://ip.taobao.com',
        changeOrigin: true,
    }
}