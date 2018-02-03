<template>
    <div id="main" class="app-main">
        <loading v-if="loadingState"></loading>
        <router-view>
        </router-view>
    </div>
</template>

<script>
    import Loading from '@/views/commpoents/Loading/Loading';

    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        computed: {
            loadingState () {
                return this.$store.state.app.loadingState;
            }
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {},
        components: {
            Loading
        }
    };
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;
    }

    .app-main {
        width: 100%;
        height: 100%;
    }
</style>
