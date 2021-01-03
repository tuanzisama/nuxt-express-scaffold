/**
 * 获取本机IP地址
 * @param {*} port 目标端口
 * @returns {Array} ip地址
 */
var package = require('../../package.json')
var os = require('os');
require('colors');
var Env = require('./env');

module.exports = (port) => {
    var OwEnv = Env('APP_ENV', "N/A");
    var projectName = '\r\n[' + package.name + ']';
    console.log(projectName.rainbow, ' DONE '.bgCyan.black, `Service has been successfully started in ${OwEnv}. \r\n`);
    console.log('    Server running at:');
    let wanIpList = _getIp(port)
    for (let i = 0; i < wanIpList.length; i++) {
        const element = wanIpList[i];
        console.log('    - ' + element.name + ':\t', element.address.cyan);
    }
    console.log('\r\n');
}

function _getIp(port) {
    var iptable = [];
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if (details.family == 'IPv4') {
                var localIpv4 = ['localhost', '127.0.0.1']
                iptable.push({
                    'name': localIpv4.includes(details.address) ? 'Local' : 'Network',
                    'address': 'http://' + details.address + ':' + port + '/',
                    'adapter': dev + (alias ? ':' + alias : '')
                })
            }
        });
    }
    return iptable;
}
