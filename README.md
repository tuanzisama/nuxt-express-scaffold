# nuxt-express-scaffold

[简体中文 README](./README.ZH-CN.md)

## What can nuxt.js solve?
- SEO optimization for search engines.
- Runs on the client in an old version or without a JavaScript engine.
- The client's network is slow.
- ...

## What did this project do?
- Integrate `Express` in this project; so you can write `Nodejs` to solve the problem of browser binding in the production environment.
- Use `http-proxy-middleware` so you can "freely" cross domains.
- Support IE10.
- Smooth deployment.
- Support SVG icon
- ...

## Directory Structure
```
├─.nuxt             // Nuxt automatically generates, temporary files for editing, build...
├─.vscode           // Visual Studio Code settings for workspace
├─assets            // Organize uncompiled static resources, such as LESS, SCSS, or JavaScript
├─components        // Vue Component
│  └─pwa            //   Component for PWA (SW events can be monitored in this component)
├─icons             // SVG icons (Compile to Vue component by command "yarn svg")
├─layouts           // Layout directory
├─middleware        // Just Middleware
├─pages             // Vue pages
├─plugins           // JavaScript plug-ins, such as Element-UI, requests, etc.
├─server            // Express Service
│  ├─routes         //   Express router
│  └─utils          //   Tools for Express
├─static            // Static resource files, such as pictures
├─store             // Just Vuex
└─utils             // Tools for Nuxt.js
    ├─common        //   General tools, constants/enumerations/functions
    └─pwa           //   Register Service-Worker
```


## How to run in the development environment?

1. Execute this command to start the hot reload service
```
yarn dev
```
2. Done.

⚠ In some cases, you may need to strip Express for debugging. This command is provided here to start, but it is *extremely not recommended*, and unexpected problems may occur!
```
yarn dev:only-nuxt
```

## How to deploy to the server?

#### What needs to be prepared?

- CI Tools ([Jenkins](https://www.jenkins.io/) or [JetBrains TeamCity](https://www.jetbrains.com/teamcity/))
- Git
- Node@12.10.0
- Yarn@1.22.10 (or NPM)
- PM2@4.5.1
- Domain name and trusted SSL certificate `(For safety and ServiceWorker)`
- NGINX (or Tengine)  `(*Optional, For Reverse proxy if needed)`

1. After configuring the corresponding Git address on the CI tool, execute the following Shell command in the Executive Shell
```
yarn one-stop-start:{environment}
```
2. Save and execute the build task

3. Observe the build console to prevent errors

4. Wait for the graceful restart to complete

```Tips: If an exception occurs, you need to log in to the server to execute "pm2 logs" to view the logs.```


## How to configure reverse proxy? (base on Express)
If your frontend app and the backend API server are not running on the same host, you will need to proxy API requests to the API server during development. This is configurable in `server\proxy\config.js`.

If you want to have more control over the proxy behavior, you can also use an object with `path: options` pairs.
Consult [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)  for full options

[Docs](https://github.com/chimurai/http-proxy-middleware#options)
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
