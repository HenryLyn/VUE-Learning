<template>
    <div>
        <h1>首页</h1>
        {{ $store.state.count }} <br />
        {{ count }} <br />
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button> <br />
        <p> List: {{ list }}</p>
        <p> List count: {{ listCount }}</p>
        <p> actions-count: {{ count }}
        <button @click="handleActionIncrement">action +1</button></p>
        <p>
            async-count: {{ count }}
            <button @click="handleAsyncIncrement">async +1</button>
        </p>
        <p>随机增加：</p>
        <Counter :number="number"></Counter>
        <router-link to="/about">跳转到about</router-link>
    </div>
</template>
<script>
import Counter from "./counter.vue";
export default {
    components: {
        Counter
    },
    data () {
        return {
            number: 0
        }
    },
    created () {
        this.$bus.on('add', this.handleAddRandom)
    },
    computed: {
        count () {
            return this.$store.state.count
        },
        list () {
            return this.$store.getters.filteredList
        },
        listCount () {
            return this.$store.getters.listCount
        }
    },
    methods: {
        handleIncrement () {
            // this.$store.commit('increment')
            // this.$store.commit('increment', 1)
            this.$store.commit({
                type: 'increment',
                count: 1
            })
        },
        handleDecrease () {
            this.$store.commit('decrease')
        },
        handleActionIncrement () {
            this.$store.dispatch('increment')
        },
        handleAsyncIncrement () {
            this.$store.dispatch('asyncIncrement')
                .then(() => {
                    console.log(this.$store.state.count)
                })
        },
        handleAddRandom (num) {
            return  this.number += num
        }
    },
    beforeDestroy () {
        this.$bus.off('add', this.handleAddRandom)
    }
}
</script>
