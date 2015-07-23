
let queryString = ( url, params ) => {
   
    return Object.keys(params).map(( key, index ) => {
        if( index === 0 ){
            url += '?';
        }
        return url += key + '=' + params[key] + '&';
    });
};



module.exports = queryString;