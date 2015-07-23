// 使用時這樣
// var queryString = require('....');
//
//
//
// url: queryString('localhost:8080/api/user', { id: '101111215', name: '雷尚樺' }),
// type: 'GET'
//
//
//
//其實他會回傳這個  localhost:8080/api/user/?id=101111215&name=雷尚樺
//
//
//Object.keys(myJSON).map(( key ) => {
//     想要取得 id 用 key
//     想要取得 '101111215' 用 myJSON[key]
// });