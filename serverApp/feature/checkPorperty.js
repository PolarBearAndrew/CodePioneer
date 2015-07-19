

let opt = 'dev';  // dev || product

let check = function( data, expect ){

	let miss = null;

	//product
	if( opt === 'dev' ){

		miss = expect.filter(( key, value ) => {
			return data[key] === undefined
		});

	//dev
	}else{

		let i = 0;
		let limit = expect.length;

		do{
			if( data[expect[i]] === undefined ){
				miss.push(expect[i]);
				break;
			}
		}while( miss.length < 1 && ++i < limit);

	}

	//return
	if( miss.length > 0 ){
		let err = new Error('缺少必要資料:');
		return {
			check: false,
			err: err,
			miss: missData
		};
	}else{
		return { check: true };
	}
};

module.exports = { check, opt };