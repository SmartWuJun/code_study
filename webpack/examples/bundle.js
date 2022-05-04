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

  0: [function (require, module, exports) {
    const { foo } = require('./foo.js');
    console.log('main.js')
    foo('wujun');
  }, {
    './foo.js': 1
  }],
  1: [function (require, module, exports) {
    function foo (val) {
      console.log('foo.js:', val)
    }

    module.exports = { foo };

  }, {}]

})


