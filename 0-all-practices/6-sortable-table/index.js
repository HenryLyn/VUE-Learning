let app = new Vue({
    el: '#app',
    data: {
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                key: 'age',
                sortable: true
            },
            {
                title: '出生日期',
                key: 'birthday',
                sortable: true
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data: [
            {
                name: '王小明',
                age: 18,
                birthday: '2000-02-21',
                address: '北京市朝阳区芍药居'
            },
            {
                name: '张三',
                age: 30,
                birthday: '1988-03-21',
                address: '北京市朝阳区望京'
            },
            {
                name: '李四',
                age: 22,
                birthday: '1996-03-21',
                address: '北京市朝阳区望京'
            }
        ]
    },
    methods: {
        handleAddData: function () {
            this.data.push({
                name: '王五',
                age: 19,
                birthday: '1999-05-30',
                address: '北京市东城区东直门'
            })
        }
    }
})
