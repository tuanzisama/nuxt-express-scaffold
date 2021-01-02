const projectName = require('./package.json').name
module.exports = {
    "apps": [{
        "name": projectName,
        "script": "./server/app.js",
        "log_date_format": "YYYY-MM-DD HH:mm:SS",
        "instances": 10,
        "exec_mode": "cluster", // 集群模式，如不指定，默认为fork
        "watch": false,
    }]
}
