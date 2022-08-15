
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable, // 两个取反, 如果不传，那么就会是 !!undefined = false, 代表不可枚举
    writable: true,
    configurable: true
  })
}

class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    // value.__ob__ = this;
    def(value, '__ob__', this)
    this.walk(value)
  }
  walk (data) {

    Object.keys(data).forEach(v => {
      defineReactive(data, v)
    })
  }
}

function observe (data) {
  if (!isObject(data)) {
    return;
  }
  let ob = null;
  if (data.__ob__) {
    ob = data.__ob__;
  } else {
    ob = new Observer(data);
  }
  return ob;


}



function defineReactive (obj, key, val) {
  let dep = new Dep();
  //没有第三个参数的时候
  if (arguments.length === 2) {
    val = obj[key];
  }
  let childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {

      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;

      dep.notify();
    }
  })


}