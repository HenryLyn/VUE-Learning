Vue.directive('birthday', {
    bind: function (el, binding) {
        let day = Birthday.getDays(binding.value)
        el.innerHTML = '已出生' + day + '天'
        el.innerHTML = el.innerHTML + '</br />' + Birthday.age(binding.value)
    },
    unbind: function () {

    }
})

let days = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
]

var Birthday = {
    age: function (timestamp) {
        let date = new Date()
        let birthday = new Date(timestamp)
        let year = date.getFullYear() - birthday.getFullYear()
        let month = date.getMonth() - birthday.getMonth()
        let day = date.getDate() - birthday.getDate()

        if (month < 0) {
            year -= 1
            month += 12
        }

        if (day < 0) {
            if (this.checkIfLeapYear(birthday.getFullYear())) {
                day += days[2][date.getMonth()]
            } else {
                day += days[1][date.getMonth()]
            }
        }

        return '年龄：' + year + '岁' + month + '个月' + day + '天'
    },
    getDays: function (timestamp) {
        var date = new Date()
        var timer = date.getTime() - timestamp
        var day = Math.floor(timer / (1000 * 60 * 60 * 24))
        return day
    },
    checkIfLeapYear: function (year) {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return true
        }
        return false
    }
}
