<template>
    <div class="container">
        <div>
            <Logo />
            <h1 class="title">
                nuxt-express-scaffold({{ env }})
                <div class="sub">
                    asyncData (from taobao.com)
                </div>
                <div class="sub">
                    {{ ipData.ip }} /
                    {{ ipData.country }}{{ ipData.region }}{{ ipData.city }}
                    {{ ipData.isp }}
                </div>
            </h1>
            <p>
                svg-icon: <svg-icon name="time"></svg-icon>
            </p>
            <p>express router: <a href="/nuxt" target="_blank" rel="noopener noreferrer">demo</a></p>
            <div class="links">
                <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
                    Documentation
                </a>
                <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey">
                    GitHub
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ $axios }) {
        const ipData = await $axios({
            url: "http://ip.taobao.com/outGetIpInfo",
            params: {
                ip: "112.40.75.119",
                accessKey: "alibaba-inc",
            },
        });
        return { ipData: ipData.data };
    },
    computed: {
        env() {
            return process.env.APP_ENV;
        },
    },
    mounted() {
        this.getIpData();
    },
    methods: {
        getIpData() {
            console.dir(this.$axios);
            this.$axios.proxy({
                url: "/taobao-ip/outGetIpInfo",
                params: {
                    ip: "112.40.75.119",
                    accessKey: "alibaba-inc",
                },
            })
                .then((result) => {
                    console.info(result);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.sub {
    font-size: 40px;
}
.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
