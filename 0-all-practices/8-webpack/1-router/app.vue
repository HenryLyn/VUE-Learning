<template>
    <!--<div>-->
        <!--Hello {{ name }}-->
    <!--</div>-->
    <!--<div>-->
        <!--<v-title title="Vue 组件化"></v-title>-->
        <!--<v-button @click="handleClick">点击按钮</v-button>-->
        <!--<p>-->
            <!--<img src="./src/assets/images/kenan.jpeg" style="width: 200px">-->
        <!--</p>-->
    <!--</div>-->
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
div {
    color: #f60;
    font-size: 24px;
}
</style>
