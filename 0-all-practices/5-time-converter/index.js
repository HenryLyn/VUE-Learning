var app = new Vue({
    el: '#app',
    data: {
        // timeNow 是目前的时间， timeBefore 是一个写死的时间 2018-11-1
        timeNow: (new Date()).getTime(),
        timeBefore: 1541038505323,
        birthday: (new Date('1994-12-28')).getTime()
    }
})
