// // Jan 1st 1970 00:00:00 am

var moment = require('moment');

// // var time = new Date.getTime();
// // var date = new Date();
// // console.log(date.getMonth());

// var date = moment();
// console.log(date.format('DD MMM YYYY'));
// console.log(date.format('MMM Do, YYYY hh:mm:ss'));
// date.add(1, 'year').subtract(5, 'months')

// console.log(date.format('MMM Do, YYYY hh:mm:ss'));


var date = moment(2134);
console.log(date.format('MM Do, YYYY h:mm a'));