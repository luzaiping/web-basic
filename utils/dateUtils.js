let moment = require('moment')

const getUnixTimestamp = date => +moment(date)
const addDay = str => moment(str).add(1, 'd')

// console.log(getUnixTimestamp('2017-07-14'))
console.log(addDay('2017-07-13').valueOf())