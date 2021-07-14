const envList = require("dotenv").config().parsed;
const env = process.env.APP_ENV || "PRODUCTION";

module.exports = {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    env: (() => {
        let allowEnv = new Object();
        new Map(Object.entries(envList)).forEach((value, key) => {
            if (key.includes(env) || key.includes("COMMON")) {
                let finallyKey = key.replace(`${env}_`, "");
                Object.assign(allowEnv, {
                    [finallyKey]: value
                });
            }
        });
        return {
            APP_ENV: env,
            ...allowEnv
        };
    })(),
    head: {
        title: "nuxt-express-scaffold",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: "develop by tuanzisama base on nuxt!"
            }
        ],
        link: [
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico"
            }
        ]
    },
    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ["element-ui/lib/theme-chalk/index.css"],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        {
            src: "@/plugins/polyfill",
            mode: "client",
            ssr: true
        },
        "@/plugins/element-ui",
        "@/plugins/request",
        "@/plugins/common",
        "@/plugins/svg-icon"
        // '@/utils/pwa/register-service-worker',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // dotenv
        [
            "@nuxtjs/dotenv",
            {
                path: "./"
            }
        ]
    ],
    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        "@nuxtjs/axios",
        // https://go.nuxtjs.dev/pwa
        "@nuxtjs/pwa",
        "nuxt-polyfill"
    ],
    pwa: {
        manifest: {
            name: "nuxt-express-scaffold",
            short_name: "LAN",
            description: "it's pwa description",
            background_color: "#2baf88",
            theme_color: "#2baf88",
            lang: "zh",
            start_url: "/"
        },
        render: {
            http2: {
                push: true
            },
            static: {
                maxAge: "1y",
                setHeaders(res, path) {
                    if (path.includes("sw.js")) {
                        res.setHeader(
                            "Cache-Control",
                            `public, max-age=${15 * 60}`
                        );
                    }
                }
            }
        }
    },
    polyfill: {
        features: [
            {
                require: "url-polyfill"
            },
            {
                require: "intersection-observer",
                detect: () => "IntersectionObserver" in window
            },
            {
                require: "smoothscroll-polyfill",
                detect: () =>
                    "scrollBehavior" in document.documentElement.style &&
                    window.__forceSmoothScrollPolyfill__ !== true,
                install: smoothscroll => smoothscroll.polyfill()
            }
        ]
    },
    babel: {
        presets(env, [preset, options]) {
            return [
                [
                    "env",
                    {
                        modules: false,
                        useBuiltIns: "entry"
                    }
                ],
                ["@nuxt/babel-preset-app", options],
                "stage-3"
            ];
        },
        plugins: ["@babel/plugin-proposal-optional-chaining"]
    },
    render: {
        resourceHints: false
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^element-ui/],
        loadingScreen: true
    },
    server: {
        port: 6898,
        host: "0.0.0.0"
    },
    telemetry: false,
    parallel: true,
    cache: true
};
