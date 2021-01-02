<template></template>
<script>
export default {
    data() {
        return {
            registration: null,
        };
    },
    mounted() {
        // Listen for swUpdated event and display refresh notification as required.
        document.addEventListener("swUpdated", this.swUpdatedHandler, {
            once: true,
        });
        document.addEventListener("swUpdateFound", this.swUpdateFoundHandler);
        // Refresh all open app tabs when a new service worker is installed.
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            console.info("sw-controllerchange");
            if (this.refreshing) return;
            this.refreshing = true;
            window.location.reload();
        });
    },
    methods: {
        swUpdatedHandler(e) {
            console.info("swUpdatedHandler");
            this.registration = e.detail;
        },
        swUpdateFoundHandler() {
            console.info("swUpdateFoundHandler");
            this.refreshApp();
        },
        refreshApp() {
            // Protect against missing registration.waiting.
            if (!this.registration || !this.registration.waiting) return;
            this.registration.waiting.postMessage("skipWaiting");
        },
    },
};
</script>