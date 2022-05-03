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
  './foo.js': function (require, module, exports) {
    function foo (val) {
      console.log('foo.js:', val)
    }

    module.exports = { foo };

  }
  ,
  './main.js': function (require, module, exports) {
    const { foo } = require('./foo.js');
    console.log('main.js')
    foo('wujun');
  }
})


