

//rank增減演算
//var: 原始rank值
let rank = ( origin, diff) => {
	let val = origin || 0;					// check parameters
	val *= Math.log(diff) / Math.log(2); 	//y = log2(diff);
	return val;
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

let weak = (rank, time) => {
	let val = {
		rank: rank * .0.97;
		time: time - 10 / time
	}
	return val;
}

module.exports = { rank, time, check, weak };