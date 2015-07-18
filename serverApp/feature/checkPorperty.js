
let checkProperty = function( reality, expect, callback ){

	let miss = expect.filter(( key, value) => {
		return reality[key] === undefined
	});

	if( miss.length >= 1 )
		callback( new Error('缺少必要資料:'), miss);
	else
		callback();
};

module.exports = checkProperty;