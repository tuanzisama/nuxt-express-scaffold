<template>
    <div class="container">
        <div>
            <div class="first-screen">
                <Logo />
                <p class="title">nuxt-express-scaffold</p>
                <p class="sub-title">The perfect solution, scaffold for nuxt and express.🛠</p>
                <p class="running-env">running on {{ env }}.</p>
                <div class="links">
                    <a href="https://github.com/tuanzisama/nuxt-express-scaffold" target="_blank" rel="noopener noreferrer" class="button--grey">
                        GitHub
                    </a>
                    <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--grey">
                        NuxtJS Documentation
                    </a>
                    <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer" class="button--grey">
                        Express Documentation
                    </a>
                </div>
            </div>
            <div class="feature-demos">
                <p class="title">Feature</p>
                <div class="feature-box-wrapper">
                    <section class="small-list">
                        <el-card class="box-card" header="Support proxy API">
                            <pre>
                                '/api': {
                                    target: '&lt;url&gt;',
                                    ws: true,
                                    changeOrigin: true
                                },
                                '/foo': {
                                    target: '&lt;other_url&gt;',
                                    changeOrigin: true
                                }
                            </pre>
                        </el-card>
                        <el-card class="box-card" header="Smooth deployment">
                            <el-link href="https://github.com/tuanzisama/nuxt-express-scaffold/tree/master#how-to-deploy-to-the-server" target="_blank">See it.</el-link>
                        </el-card>
                        <el-card class="box-card" header="Support SVG icon">
                            <svg-icon name="time"></svg-icon>
                            <pre>
                                &lt;svg-icon name="time" /&gt;
                            </pre>
                        </el-card>
                        <el-card class="box-card" header="Original Express route">
                            <p>Click <el-link href="/nuxt" target="_blank">here</el-link> to view the route created by express.</p>
                        </el-card>
                    </section>
                    <section class="bigger-list">
                        <el-card class="box-card" header="Multi environment">
                            You can specify env variables by placing the following files in your project root:
                            <pre>
                            .env # loaded in all cases
                            .env.local # loaded in all cases, ignored by git
                            .env.[mode] # only loaded in specified mode
                            .env.[mode].local # only loaded in specified mode, ignored by git
                            </pre>
                            An env file simply contains key=value pairs of environment variables:
                            <pre>
                            FOO=bar
                            VUE_APP_NOT_SECRET_CODE=some_value
                            </pre>
                        </el-card>
                        <el-card class="box-card" header="Hot reload on development mode">
                            1. Execute this command to start the hot reload service
                            <pre>yarn dev</pre>
                            2. Done.
                            <br>
                            ⚠ In some cases, you may need to strip Express for debugging. This command is provided here to start, but it is extremely not recommended, and unexpected problems may occur!
                            <pre>yarn dev:only-nuxt</pre>
                        </el-card>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        env() {
            return process.env.APP_ENV;
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    color: #35495e;
}
.first-screen {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    letter-spacing: 1px;
    .title {
        font-size: 60px;
        font-weight: 700;
    }
    .sub-title {
        font-size: 25px;
        font-weight: 300;
    }
    .running-env {
        margin-top: 20px;
        font-size: 14px;
    }
}
.links {
    margin-top: 20px;
}
.feature-demos {
    max-width: 1024px;
    margin: 0 auto;
    min-height: 100vh;
    .title {
        font-size: 40px;
        font-weight: 700;
        text-align: center;
        margin: 20px 0;
    }
    .feature-box-wrapper {
        display: flex;
        .small-list {
            width: 300px;
            flex-shrink: 0;
            margin-right: 20px;
        }
        .bigger-list {
            flex: 1;
        }
        .box-card {
            margin-bottom: 20px;
            pre {
                white-space: pre-line;
                line-height: 1.4;
                padding: 1.25rem 1.5rem;
                margin: 0.85rem 0;
                background-color: #282c34;
                border-radius: 6px;
                overflow: auto;
                color: #fff;
            }
        }
    }
}
</style>
