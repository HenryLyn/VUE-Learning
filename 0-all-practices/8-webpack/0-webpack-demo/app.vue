<template>
    <!--<div>-->
        <!--Hello {{ name }}-->
    <!--</div>-->
    <div>
        <v-title title="Vue 组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="./src/assets/images/kenan.jpeg" style="width: 200px">
        </p>
    </div>
</template>
<script>
import vTitle from './src/component/title.vue'
import vButton from './src/component/button.vue'

export default {
    components: {
        vTitle,
        vButton
    },
    methods: {
        handleClick (e) {
            console.log(e)
        }
    }
    // data () {
    //     return {
    //         name: 'vue.js'
    //     }
    // }
}
</script>
<style scoped>
div {
    color: #f60;
    font-size: 24px;
}
</style>
