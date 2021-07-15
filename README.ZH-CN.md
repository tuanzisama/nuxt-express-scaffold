# nuxt-express-scaffold

🛠 基于 Express 的 NuxtJS 脚手架解决方案。

[English README](./README.md)

## 为什么使用Nuxt
- 客户端的网络比较慢
- 客户端运行在老的或者直接没有 JavaScript 引擎上
- 利于搜索引擎的SEO优化
- ...

## 此脚手架集成了什么？
- 在此项目中集成了 `Express`；这样你可以编写 `Nodejs` 以解决在生产环境中浏览器存在约束力的问题
- 接入 `http-proxy-middleware` 这样可以自由的跨域了
- 支持 IE10
- 支持 部署时平滑重启
- 支持 SVG 文件转图标组件
- 支持 PWA
- ...

## 目录结构
```
├─.nuxt             // Nuxt自动生成，临时的用于编辑的文件，build
├─.vscode           // vscode针对工作区的设置
├─assets            // 组织未编译的静态资源入LESS、SASS 或 JavaScript
├─components        // Vue组件
│  └─pwa            //   PWA组件
├─icons             // SVG图标，通过yarn svg编译为Vue组件
├─layouts           // 布局目录，用于组织应用的布局组件，不可更改。
├─middleware        // 中间件
├─pages             // Vue页面
├─plugins           // JavaScript插件，如Element-UI、请求等
├─server            // Express服务
│  ├─routes         //   Express路由文件
│  └─utils          //   服务工具类
├─static            // 静态资源文件，比如图片
├─store             // 组织应用的Vuex 状态管理
└─utils             // Nuxt工具类
    ├─common        //   通用工具，常量/枚举/函数
    └─pwa           //   注册Service-Worker
```

# 配置环境变量

在这个脚手架中，环境变量与 Vue CLI 配置相同。具体参照此 [链接](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F) 所述。

## 如何运行在开发环境？

1. 执行此命令，以启动热重载服务
```
yarn dev
```
2. 完毕

⚠ 请注意：某些情况下，你可能需要剥离 Express 进行调试，在此提供此命令启动，但极为不推荐，可能会出现超出预期的问题！
```
yarn dev:only-nuxt
```

## 如何部署到服务器？

#### 需要准备什么？

- CI工具(Jenkins or JetBrains TeamCity)
- Git
- Node@12.10.0
- Yarn@1.22.10 (or NPM)
- PM2@4.5.1 (Base on Yarn)
- 域名和被信任的SSL证书
- (可选) NGINX (or Tengine)

1. 在CI工具上配置好对应的Git地址后，在Excute Shell中执行输入下面的Shell命令
```
yarn one-stop-start:{environment}
```
2. 保存，执行构建任务

3. 查看构建控制台，以防止出现错误

4. 等待平滑重启完毕

Tips: 如果出现异常，需登入服务器执行`pm2 logs`查看日志即可

## 如何配置基于Express的反向代理？
如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要将 API 请求代理到 API 服务器。这个问题可以通过 `server\proxy\config.js` 来配置。

如果你想要更多的代理控制行为，也可以使用一个 `path: options` 成对的对象。完整的选项可以查阅 [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) 。

```
'/api': {
    target: '<url>',
    ws: true,
    changeOrigin: true
},
'/foo': {
    target: '<other_url>'
}
```

## 欢迎fork项目，提出Issues和PR！
如果你使用了，或对本项目有建树性的建议，可发送电子邮件至 `tuanzi@hatsunemiku.club` 或前往 `Github Discussions`。