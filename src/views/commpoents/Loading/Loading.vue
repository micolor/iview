<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .ivu-spin-fix {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
        width: 100%;
        height: 100%;
        background-color: hsla(0,0%,100%,.3);
    }
</style>
<template>
    <div>
        <Spin fix>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>loading...</div>
        </Spin>
    </div>
</template>
<script>
</script>
