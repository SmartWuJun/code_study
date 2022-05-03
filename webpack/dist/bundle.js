(function (modules) {
  function require (filePath) {


    let fun = modules[filePath];
    let module = {
      exports: {}
    }
    fun(require, module, module.exports)

    return module.exports
  }

  require('./main.js');

})({
  
     "./examples/main.js": function (require, module, exports) {
   "use strict";

var _foo = require("./foo.js");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('main.js');
(0, _foo2.default)('wujun');
 
     "/Users/wujun/Documents/study/code_study/webpack/examples/foo.js": function (require, module, exports) {
   "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val) {
  console.log('foo.js:', val);
};
 
 

  }
 
})


