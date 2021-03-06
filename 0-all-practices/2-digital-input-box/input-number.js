Vue.component('input-number', {
    template: '' +
        '<div class="input-number">' +
        '   <label>step:</label>' +
        '   <input type="number" v-model="step">' +
        '   <input' +
        '       type="text"' +
        '       :value="currentValue"' +
        '       @change="handleChange"' +
        '       @keydown.up="handleUp"' +
        '       @keydown.down="handleDown">' +
        '   <button' +
        '       @click="handleDown"' +
        '       :disabled="currentValue <= min">-</button>' +
        '   <button' +
        '       @click="handleUp"' +
        '       :disabled="currentValue >= max">+</button>' +
        '</div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            currentValue: this.value,
            step: 1
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val)
            this.$emit('on-change', val)
        },
        value: function (val) {
            this.updateValue(val)
        }
    },
    methods: {
        updateValue: function (val) {
            if (val > this.max) {
                val = this.max
            }

            if (val < this.min) {
                val = this.min
            }

            this.currentValue = val
        },
        handleDown: function () {
            if (this.currentValue <= this.min) {
                return
            }
            // this.currentValue--
            this.currentValue -= Number(this.step)
        },
        handleUp: function () {
            if (this.currentValue >= this.max) {
                return
            }
            // this.currentValue++
            this.currentValue += Number(this.step)
        },
        handleChange: function (event) {
            var val = event.target.value.trim()
            var max = this.max
            var min = this.min

            if (isValueNumber(val)) {
                val = Number(val)
                this.currentValue = val

                if (val > max) {
                    this.currentValue = max
                } else if (val < min) {
                    this.currentValue = min
                }
            } else {
                event.target.value = this.currentValue
            }
        }
    },
    mounted: function () {
        this.updateValue(this.value)
    }
})
