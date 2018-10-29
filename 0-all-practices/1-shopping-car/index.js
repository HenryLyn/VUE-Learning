var app = new Vue({
    el: '#app',
    data: {
        checked: [],
        list: [
            {
                id: 1,
                name: 'iphone 7',
                price: 6188,
                count: 1
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1
            }
        ],
        list2: [
            [
                {
                    id: 1,
                    name: 'iPhone 6',
                    price: 4388,
                    count: 1
                },
                {
                    id: 2,
                    name: 'iphone 7',
                    price: 6188,
                    count: 1
                }
            ],
            [
                {
                    id: 3,
                    name: 'MacBook Pro',
                    price: 21488,
                    count: 1
                },
                {
                    id: 3,
                    name: 'MacBook',
                    price: 12345,
                    count: 1
                }
            ]
        ],
        checkAllMsg: '全选'
    },
    computed: {
        totalPrice: function () {
            var total = 0
            // 计算全部价格
            // for (var i = 0; i < this.list.length; i++) {
            //     var item = this.list[i]
            //     total += item.price * item.count
            // }

            // 计算选中价格
            this.checked.forEach((value) => {
                total += this.list[value].count * this.list[value].price
            })

            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
        }
    },
    methods: {
        handleReduce: function (index) {
            if (this.list[index].count === 1) {
                return
            }
            this.list[index].count--
        },
        handleAdd: function (index) {
            this.list[index].count++
        },
        handleRemove: function (index) {
            // 验证该值是否选中，如果选中，将比该值大的坐标前移‘-1’
            var i = this.checked.indexOf(index)
            if (i != -1) {
                this.checked.splice(i, 1)
                this.checked.forEach((value, tmpIndex) => {
                    if (value > index) {
                        this.checked[tmpIndex]--
                    }
                })
            }
            this.list.splice(index, 1)
        },
        checkAll: function (event) {
            if (event.target.checked) {
                this.list.forEach((value, i) => {
                    // 数组里没有该value值时push，否则不做操作, 防止重复push
                    if (this.checked.indexOf(i) == -1) {
                        this.checked.push(i)
                    }
                })
                this.checkAllMsg = '取消全选'
                console.log(this.checked)
            } else {
                // 全不选则清空数据
                this.checked = []
                this.checkAllMsg = '全选'
                console.log(this.checked)
            }
        }
    },
    watch: {
        checked: {
            // 监听item是否全选
            handler() {
                if (this.checked.length == this.list.length) {
                    document.querySelector('#check-all').checked = true
                    this.checkAllMsg = '取消全选'
                } else {
                    document.querySelector('#check-all').checked = false
                    this.checkAllMsg = '全选'
                }
            },
            deep: true
        }
    }
})
