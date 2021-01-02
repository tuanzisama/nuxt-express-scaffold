var net = require('net')
/**
 * 检查端口是否被占用
 * @param {*} port 端口号 
 */
module.exports = (port) => {
    return new Promise((resolve, reject) => {
        try {
            var server = net.createServer().listen(port)
            server.on('listening', function () {
                server.close()
                resolve({ code: "OK" })
            })
            server.on('error', function (err) {
                if (err.code === 'EADDRINUSE') {
                    reject(err)
                }
                reject(err)
            })
        } catch (error) {
            reject({ code: "UNKNOWN_ERROR", message: "Unexception error." })
        }
    })
}
