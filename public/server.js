module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(26);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPosts = getPosts;
exports.addPost = addPost;
exports.removePost = removePost;
exports.sortPost = sortPost;
var path = 'http://localhost:3000';

var SORT_POSTS = exports.SORT_POSTS = "SORT_POSTS";
var RECIEVE_POSTS = exports.RECIEVE_POSTS = "RECIEVE_POSTS";

function fetchPosts(url, dispatch) {
    return fetch(url).then(function (response) {
        return response.json().then(function (json) {
            return dispatch(recievePosts(json));
        });
    });
}

function fetchAddPost(url, data, dispatch) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return dispatch(getPosts());
    });
}

function fetchRemovePost(url, id, dispatch) {
    return fetch(url, {
        method: 'DELETE',
        body: id
    }).then(function (response) {
        return dispatch(getPosts());
    });
}

function getPosts() {
    return function (dispatch, getState) {
        return fetchPosts(path + "/blogs", dispatch);
    };
}

function addPost(data) {
    return function (dispatch, getState) {
        return fetchAddPost(path + "/blogs", data, dispatch);
    };
}

function removePost(id) {
    return function (dispatch, getState) {
        return fetchRemovePost(path + "/blogs/" + id, id, dispatch);
    };
}

function recievePosts(posts) {
    return {
        type: RECIEVE_POSTS,
        posts: posts
    };
}

function sortPost(sortBy) {
    return {
        type: SORT_POSTS,
        sortBy: sortBy
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(28);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./content.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./content.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(9);

var _Post2 = _interopRequireDefault(_Post);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

var _content = __webpack_require__(7);

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const BlogAPI = {
//     posts: [
//         {number: 1, title: "Ben Blocker", description: "Comedies Comedies Comedies Comedies", releaseDate: "2014", author: "Quentin Tarantino"},
//         {number: 2, title: "Dave Defend", description: "Dramas Dramas Dramas Dramas Dramas", releaseDate: "2015", author: "Quentin Tarantino"},
//         {number: 3, title: "Sam Sweeper", description: "Dramas Dramas Dramas Dramas Dramas Dramas", releaseDate: "2014", author: "Quentin Tarantino"},
//         {number: 4, title: "Matt Midfiel", description: "Thriller Thriller Thriller Thriller Thriller", releaseDate: "2015", author: "Big Dealan"},
//         {number: 5, title: "Will Winger", description: "Thriller Thriller Thriller Thriller Thriller", releaseDate: "2014", author: "Big Dealan"},
//         {number: 6, title: "Fillipe Forw", description: "Comedies Comedies Comedies Comedies", releaseDate: "2016", author: "Big Dealan"},
//         {number: 7, title: "William Win", description: "Thriller Thriller Thriller Thriller Thriller", releaseDate: "2017", author: "Gvinet Paltrou"},
//         {number: 8, title: "Fil Forward", description: "Comedies Comedies Comedies Comedies", releaseDate: "2016", author: "Gvinet Paltrou"}
//     ],
//     all: function() { return this.posts},
//     get: function(id) {
//         const isPost = p => p.number === id;
//         return this.posts.find(isPost)
//     }
// };

var ContentPost = function (_React$Component) {
    _inherits(ContentPost, _React$Component);

    function ContentPost(props) {
        _classCallCheck(this, ContentPost);

        return _possibleConstructorReturn(this, (ContentPost.__proto__ || Object.getPrototypeOf(ContentPost)).call(this, props));
    }

    _createClass(ContentPost, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.requestPosts();
        }
    }, {
        key: 'requestPosts',
        value: function requestPosts() {
            this.props.fetchPosts();
        }
    }, {
        key: 'sortPostsBy',
        value: function sortPostsBy(sortBy, posts) {
            if (sortBy === "releaseDate") {
                posts.sort(function (a, b) {
                    var itemA = a.releaseDate || '0';
                    var itemB = b.releaseDate || '0';
                    return itemB.replace(/-/g, '') - itemA.replace(/-/g, '');
                });
            } else {
                posts.sort(function (a, b) {
                    return a.author.localeCompare(b.author);
                });
            }
            return posts;
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props.state);
            var posts = this.sortPostsBy(this.props.sortBy, this.props.posts);
            return _react2.default.createElement(
                'div',
                { className: 'content' },
                posts.map(function (p) {
                    return _react2.default.createElement(_Post2.default, { info: p, key: p.id });
                })
            );
        }
    }]);

    return ContentPost;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        posts: store.storePosts.posts,
        sortBy: store.storePosts.sortBy
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: function fetchPosts() {
            dispatch((0, _actions.getPosts)());
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ContentPost));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _post = __webpack_require__(24);

var _post2 = _interopRequireDefault(_post);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_React$Component) {
    _inherits(Post, _React$Component);

    function Post(props) {
        _classCallCheck(this, Post);

        return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));
    }

    _createClass(Post, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var info = this.props.info;
            return _react2.default.createElement(
                'article',
                { className: 'poster' },
                _react2.default.createElement(
                    'h3',
                    { className: 'title' },
                    info.title
                ),
                _react2.default.createElement('input', { type: 'button', value: 'Delete', className: 'delete-button-post',
                    onClick: function onClick() {
                        _this2.props.fetchRemovePosts(info.id);
                    } }),
                _react2.default.createElement(
                    'p',
                    { className: 'description' },
                    info.description
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'post-inform' },
                    _react2.default.createElement(
                        'span',
                        { className: 'data' },
                        info.releaseDate
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'author' },
                        info.author
                    )
                )
            );
        }
    }]);

    return Post;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        fetchRemovePosts: function fetchRemovePosts(id) {
            dispatch((0, _actions.removePost)(id));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(null, mapDispatchToProps)(Post));
;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(9);

var _Post2 = _interopRequireDefault(_Post);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

var _content = __webpack_require__(7);

var _content2 = _interopRequireDefault(_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentAddPost = function (_React$Component) {
    _inherits(ContentAddPost, _React$Component);

    function ContentAddPost(props) {
        _classCallCheck(this, ContentAddPost);

        var _this = _possibleConstructorReturn(this, (ContentAddPost.__proto__ || Object.getPrototypeOf(ContentAddPost)).call(this, props));

        _this.state = {
            title: null,
            description: null,
            author: null,
            releaseDate: null
        };

        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(ContentAddPost, [{
        key: 'adjust_textarea',
        value: function adjust_textarea(h) {
            h.style.height = "20px";
            h.style.height = h.scrollHeight + "px";
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();
            console.log(this.state);
            this.props.fetchAddPost(this.state);
            this.props.history.push("/");
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var target = e.target;
            var value = target.value;
            var name = target.name;
            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'content-add-post' },
                _react2.default.createElement(
                    'h2',
                    { className: 'create-post-title' },
                    ' Create your new post'
                ),
                _react2.default.createElement(
                    'form',
                    { className: 'add-post', onSubmit: this.onSubmit },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'title' },
                        'Enter title of the new post'
                    ),
                    _react2.default.createElement('input', { name: 'title', type: 'text', id: 'title', placeholder: 'Title..',
                        onChange: this.onChange }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'description' },
                        'Enter description of the new post'
                    ),
                    _react2.default.createElement('textarea', { name: 'description', id: 'description', placeholder: 'Description..',
                        onChange: this.onChange }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'author' },
                        'Enter your name'
                    ),
                    _react2.default.createElement('input', { name: 'author', type: 'text', id: 'author', placeholder: 'Your name..',
                        onChange: this.onChange }),
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'releaseDate' },
                        'Enter date'
                    ),
                    _react2.default.createElement('input', { name: 'releaseDate', type: 'text', id: 'releaseDate', placeholder: 'Choosen date..',
                        onChange: this.onChange }),
                    _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
                )
            );
        }
    }]);

    return ContentAddPost;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        fetchAddPost: function fetchAddPost(data) {
            dispatch((0, _actions.addPost)(data));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(null, mapDispatchToProps)(ContentAddPost));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(13);

var _path2 = _interopRequireDefault(_path);

var _handleRander = __webpack_require__(14);

var _handleRander2 = _interopRequireDefault(_handleRander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 7700;
var PUBLIC_PATH = '.';

var app = (0, _express2.default)();

app.use(_express2.default.static(PUBLIC_PATH));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Serve requests with our handleRender function
app.get('*', _handleRander2.default);

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '...');
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = handleRender;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(15);

var _reactRouterDom = __webpack_require__(1);

var _reactRouterConfig = __webpack_require__(16);

var _reactRedux = __webpack_require__(4);

var _store = __webpack_require__(17);

var _store2 = _interopRequireDefault(_store);

__webpack_require__(22);

var _routes = __webpack_require__(23);

var _routes2 = _interopRequireDefault(_routes);

var _App = __webpack_require__(29);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderPage(renderedApp, preloadedState) {
    var appData = '<!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <title>SPA</title>\n    </head>\n    <body>\n    <div id="app">' + renderedApp + '</div>\n    <script>\n        window.PRELOADED_STATE = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n    </script>\n    <script type="text/javascript" src="./public/bundle.js"></script>\n    </body>\n    </html>';

    return appData;
}

function handleRender(req, res) {
    // const css = new Set(); // CSS for all rendered React components
    // const context = { insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())) };
    var context = {};
    var store = (0, _store2.default)();
    var branch = (0, _reactRouterConfig.matchRoutes)(_routes2.default, req.url);
    var promiseAll = branch.map(function (_ref) {
        var route = _ref.route,
            match = _ref.match;
        var fetchData = route.component.fetchData;

        if (!(fetchData instanceof Function)) {
            return Promise.resolve(null);
        }
        return fetchData(store.dispatch, match);
    });
    Promise.all(promiseAll).then(function () {
        var app = _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                _reactRouterDom.StaticRouter,
                { location: req.url, context: context },
                _react2.default.createElement(_App2.default, null)
            )
        );
        var renderedApp = (0, _server.renderToString)(app);

        if (context.url) {
            return res.redirect(context.url);
        }

        var preloadedState = store.getState();

        return res.send(renderPage(renderedApp, preloadedState));
    });
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(6);

var _reduxThunk = __webpack_require__(18);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _index = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default);

exports.default = function (initialState) {
    return (0, _redux.createStore)(_index.rootReducer, initialState, middleware);
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rootReducer = undefined;

var _redux = __webpack_require__(6);

var _userReducer = __webpack_require__(20);

var _userReducer2 = _interopRequireDefault(_userReducer);

var _postsReducer = __webpack_require__(21);

var _postsReducer2 = _interopRequireDefault(_postsReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_userReducer2.default);
console.log(_postsReducer2.default);

var rootReducer = exports.rootReducer = (0, _redux.combineReducers)({
    storeUser: _userReducer2.default,
    storePosts: _postsReducer2.default
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;
// import {

// } from '../actions/actions'

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        usersPost: []
    };
    var action = arguments[1];

    switch (action.type) {
        default:
            return state;
    }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _redux = __webpack_require__(6);

var _actions = __webpack_require__(5);

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        posts: [],
        sortBy: 'releaseDate'
    };
    var action = arguments[1];

    switch (action.type) {
        case _actions.RECIEVE_POSTS:
            {
                return Object.assign({}, state, { posts: action.posts });
            }
        case _actions.SORT_POSTS:
            {
                return Object.assign({}, state, { sortBy: action.sortBy });
            }
        default:
            return state;
    }
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ContentPost = __webpack_require__(8);

var _ContentPost2 = _interopRequireDefault(_ContentPost);

var _ContentAddPost = __webpack_require__(10);

var _ContentAddPost2 = _interopRequireDefault(_ContentAddPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/',
  component: _ContentPost2.default
}, {
  path: '/add',
  component: _ContentAddPost2.default
}];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(25);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./post.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./post.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".delete-button-post{\r\n    color: rgb(223, 128, 128);\r\n    padding: 5px 10px;\r\n    background-color: white;\r\n    font-size: 12px;\r\n    border: none;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    right: 5px;\r\n    top: 5px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.post-inform .author{\r\n    color: rgb(140,140,140);\r\n}\r\n\r\n.post-inform{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding: 10px 0 5px 0;\r\n}\r\n\r\n.post-inform span:first-child{\r\n    font-size: 12px;\r\n    width: 100px;\r\n    font-weight: bold;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.title{\r\n    max-width: 290px;\r\n}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".content {\r\n    display: flex;\r\n    flex-direction: row;\r\n    flex-wrap: wrap;\r\n    justify-content: flex-start;\r\n    align-items: flex-start;\r\n    align-content: flex-start;\r\n    flex: 1 0 auto;\r\n    padding: 0 10px 20px 10px;\r\n}\r\n\r\n.content-add-post{\r\n    display: flex;\r\n    flex-direction: column;\r\n    flex-wrap: wrap;\r\n    flex: 1 0 auto;\r\n    padding: 0 10px 20px 10px;\r\n}\r\n\r\n.imageBlock {\r\n    display: block;\r\n    height: 200px;\r\n    width: 150px;\r\n}\r\n\r\n.poster {\r\n    padding: 10px;\r\n    margin: 10px;\r\n    flex: 0 1 auto;\r\n    margin-right: 20px;\r\n    background-color: #F5F5F5;\r\n    max-width: 350px;\r\n    min-width: 350px;\r\n    border-radius: 5px;\r\n    position: relative;\r\n}\r\n\r\n.not-found-post {\r\n    margin: 0 auto;\r\n    font-size: 40px;\r\n    color: rgb(210,210,210);\r\n    align-self: center;\r\n}\r\n\r\n.create-post-title{\r\n    margin: 20px auto;\r\n}\r\n\r\n.add-post{\r\n    margin: 20px auto;\r\n    width: 70%;\r\n}\r\n\r\n.add-post > label {\r\n    display: inline-block;\r\n    padding-left: 7px;\r\n    color: rgb(105, 100, 100);\r\n    font-weight: bold;\r\n}\r\n\r\n.add-post > input[type=text], .add-post textarea {\r\n    outline: none;\r\n    display: block;\r\n    width: 100%;\r\n    padding: 7px;\r\n    border: none;\r\n    border-bottom: 1px solid #ddd;\r\n    background: transparent;\r\n    margin-bottom: 10px;\r\n    font: 14px Arial, Helvetica, sans-serif;\r\n    height: 30px;\r\n}\r\n\r\n.add-post textarea{\r\n    resize:none;\r\n    overflow: hidden;\r\n}\r\n\r\n.add-post input[type=submit]{\r\n    color: white;\r\n    padding: 10px 20px;\r\n    background-color: rgb(97, 241, 162);\r\n    font-size: 12px;\r\n    border: none;\r\n    cursor: pointer;\r\n    border-radius: 5px;\r\n    position: relative;\r\n    right: -80%;\r\n    width: 20%;\r\n    margin-top: 15px;\r\n}", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Header = __webpack_require__(30);

var _Header2 = _interopRequireDefault(_Header);

var _Content = __webpack_require__(36);

var _Content2 = _interopRequireDefault(_Content);

var _Footer = __webpack_require__(38);

var _Footer2 = _interopRequireDefault(_Footer);

__webpack_require__(41);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(_Header2.default, null),
                _react2.default.createElement(_Content2.default, null),
                _react2.default.createElement(_Footer2.default, null)
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _ResultSortBox = __webpack_require__(31);

var _ResultSortBox2 = _interopRequireDefault(_ResultSortBox);

var _header = __webpack_require__(34);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'header',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'header-part' },
                        _react2.default.createElement('div', { className: 'fond-image' }),
                        _react2.default.createElement(
                            'h1',
                            null,
                            'Keep calm and add new post;)'
                        ),
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/add' },
                            _react2.default.createElement('input', { type: 'button', value: 'ADD', className: 'add-button-post' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'result-panel' },
                        _react2.default.createElement(_ResultSortBox2.default, null)
                    )
                )
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

exports.default = Header;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _actions = __webpack_require__(5);

__webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultSortBox = function (_React$Component) {
    _inherits(ResultSortBox, _React$Component);

    function ResultSortBox(props) {
        _classCallCheck(this, ResultSortBox);

        var _this = _possibleConstructorReturn(this, (ResultSortBox.__proto__ || Object.getPrototypeOf(ResultSortBox)).call(this, props));

        _this.state = {
            selectedSort: 'releaseDate'
        };
        return _this;
    }

    _createClass(ResultSortBox, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'sort-part' },
                _react2.default.createElement(
                    'p',
                    { className: 'count-posts' },
                    this.props.countPosts ? this.props.countPosts === 1 ? "Only one post found" : this.props.countPosts + " posts found" : "No posts found"
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'radios-as-text' },
                    _react2.default.createElement(
                        'p',
                        { className: 'sort-by-title' },
                        'Sort by'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'sortBy', id: 'releaseDate', checked: this.props.selectedSort === 'releaseDate', onChange: this.props.handleSortChange }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'releaseDate' },
                            'release data'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'sortBy', id: 'author', checked: this.props.selectedSort === 'author', onChange: this.props.handleSortChange }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'author' },
                            'author'
                        )
                    )
                )
            );
        }
    }]);

    return ResultSortBox;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store) {
    return {
        countPosts: store.storePosts.posts.length,
        selectedSort: store.storePosts.sortBy
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        handleSortChange: function handleSortChange(changeEvent) {
            dispatch((0, _actions.sortPost)(changeEvent.target.id));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResultSortBox);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(33);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./resultBox.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./resultBox.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sort-part{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    padding: 10px 80px;\r\n}\r\n.count-posts, .sort-by-title, .sort-director {\r\n    color: rgb(59,68,75);\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    margin-top: 2px;\r\n}\r\n\r\n.radios-as-text{\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n\r\n.radios-as-text input{\r\n    position: absolute;\r\n    left: -99999px;\r\n}\r\n\r\n.radios-as-text label {\r\n    color: rgb(59,68,75);\r\n    margin-left: 10px;\r\n    font-weight: bold;\r\n    font-size: 14px;\r\n    cursor: pointer;\r\n}\r\n\r\n.radios-as-text input[type=radio]:checked ~ label {\r\n    color: rgb(251, 99, 98);\r\n}\r\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(35);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./header.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./header.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".header{\r\n    flex: 1 0 auto;\r\n}\r\n\r\n.header-part{\r\n   position: relative;\r\n   z-index: 5;\r\n   min-height: 100px;\r\n}\r\n\r\n.header-part .fond-image {\r\n    position: absolute;\r\n    z-index: -1;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    background-image: url(\"http://qubemedia.net/wp-content/uploads/2015/04/book-film-holiday.jpg\");\r\n    background-size: cover;\r\n    width: 100%;\r\n    height: 100%;\r\n    box-shadow:0 0 0 128px rgba(0, 0, 0, 0.33) inset;\r\n}\r\n\r\n.header-part h1{\r\n    color: rgb(251, 99, 98);\r\n    text-align: left;\r\n    padding: 40px 0 0 200px;\r\n}\r\n\r\n.result-panel {\r\n    background-color: rgb(230, 230, 230);\r\n    height: 40px;\r\n}\r\n\r\n.add-button-post{\r\n    color: rgb(251, 99, 98);\r\n    padding: 10px 20px;\r\n    background-color: white;\r\n    font-size: 12px;\r\n    border: none;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    right: 60px;\r\n    top: 10px;\r\n    border-radius: 5px;\r\n}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _NotFound = __webpack_require__(37);

var _NotFound2 = _interopRequireDefault(_NotFound);

var _ContentPost = __webpack_require__(8);

var _ContentPost2 = _interopRequireDefault(_ContentPost);

var _ContentAddPost = __webpack_require__(10);

var _ContentAddPost2 = _interopRequireDefault(_ContentAddPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = function Content() {
    return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { path: '/add', component: _ContentAddPost2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/', component: _ContentPost2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '*', component: _ContentPost2.default })
    );
};

exports.default = Content;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_React$Component) {
    _inherits(NotFound, _React$Component);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    _createClass(NotFound, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'content' },
                _react2.default.createElement(
                    'p',
                    { className: 'not-found-post' },
                    'No post found'
                )
            );
        }
    }]);

    return NotFound;
}(_react2.default.Component);

exports.default = NotFound;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
    _inherits(Footer, _React$Component);

    function Footer() {
        _classCallCheck(this, Footer);

        return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    _createClass(Footer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'footer' },
                _react2.default.createElement(
                    'h4',
                    null,
                    'netflixroulette'
                )
            );
        }
    }]);

    return Footer;
}(_react2.default.Component);

exports.default = Footer;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(40);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../../node_modules/css-loader/index.js!./footer.css", function () {
    content = require("!!../../../../node_modules/css-loader/index.js!./footer.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".footer {\r\n    flex: 0 0 auto;\r\n    background-color: rgb(59,68,75);\r\n}\r\n\r\n.footer h4 {\r\n    color: rgb(251, 99, 98);\r\n    text-align: left;\r\n    padding: 20px 0 20px 40px;\r\n}", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var content = __webpack_require__(42);
var insertCss = __webpack_require__(3);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

module.exports = content.locals || {};
module.exports._getContent = function () {
  return content;
};
module.exports._getCss = function () {
  return content.toString();
};
module.exports._insertCss = function (options) {
  return insertCss(content, options);
};

// Hot Module Replacement
// https://webpack.github.io/docs/hot-module-replacement
// Only activated in browser context
if (false) {
  var removeCss = function removeCss() {};
  module.hot.accept("!!../../../node_modules/css-loader/index.js!./app.css", function () {
    content = require("!!../../../node_modules/css-loader/index.js!./app.css");

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    removeCss = insertCss(content, { replace: true });
  });
  module.hot.dispose(function () {
    removeCss();
  });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\nhtml,\r\nbody {\r\n    height: 100%;\r\n}\r\n\r\n#app{\r\n    height: 100%;\r\n}\r\n\r\n.wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    width: 850px;\r\n    margin: 0 auto;\r\n    font-family: Arial, sans-serif;\r\n}", ""]);

// exports


/***/ })
/******/ ]);