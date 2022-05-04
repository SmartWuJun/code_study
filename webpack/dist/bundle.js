(function (modules) {
  function require (id) {


    let [fun, mapping] = modules[id];
    let module = {
      exports: {}
    }
    let localRequire = function (filePath) {
      let tempId = mapping[filePath];
      return require(tempId);
    }

    fun(localRequire, module, module.exports)

    return module.exports
  }

  require(0);

})({
  
     "0": [function (require, module, exports) {
   "use strict";

var _foo = require("./foo.js");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('main.js');
(0, _foo2.default)('wujun');},{"./foo.js":1}],
 
     "1": [function (require, module, exports) {
   "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val) {
  console.log('foo.js:', val);
  (0, _bar.bar)();
};

var _bar = require("./bar.js");

var _user = require("./user.json");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('userJson: ', _user2.default);},{"./bar.js":2,"./user.json":3}],
 
     "2": [function (require, module, exports) {
   "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

function bar() {
  console.log('console.log bar');
}},{}],
 
     "3": [function (require, module, exports) {
   "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "name": "wj",
  "age": 20
};},{}],
 
 
})


