var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({

	//user
	USER_LOGIN: null,
	USER_LOAD: null,
	CHANGE_DISPLAY: null,

	//article
	ARTICLE_LOAD: null,
	ARTICLE_LOADMORE: null,
	ARTICLE_FILTER: null,
	ARTICLE_LOADLIKE: null,
	ARTICLE_LOADTHEYLIKE: null,

	//like
	LIKE_LOAD: null,
	LIKE_ADD: null,
	LIKE_DELETE: null,


	//nothing
  	noop: null
});