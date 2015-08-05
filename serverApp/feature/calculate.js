

//rank增減演算
//var: 原始rank值
let rank = ( origin, diff) => {
	let val = origin || 0;					// check parameters
	val *= Math.log(diff) / Math.log(2); 	//y = log2(diff);
	return val;
};

//sec : milliseconds from of 1970/1/1 00:00
let time = sec => {

	// let oneDay = 720;			// 0.5 day
	// let pass = 1438758900000;	//milliseconds from of 1970/1/1 00:00 to 2015/8/1 00:00 (about)

	// //return 0.5day from of 2015/8/1 00:00
	// if( typeOf(sec) === typeOf('string') )
	// 	return ( sec - pass ) / oneDay;
	// else
	// 	return ( Date.getTime(sec) - pass ) / oneDay;
	return 31;
};

//f(x,y) = 16x + 30y - 240 = 0

let check = ( rank, time, num) => {

	let tolerant = num || 0;
	let val = 16 * rank + 30 * time - 240 + tolerant;

	if( val > 0)
		return true;
	else
		return false;
};

let weak = time => {
	return time - 10 / time;
}

module.exports = { rank, time, check, weak };