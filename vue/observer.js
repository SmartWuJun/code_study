
class Observer {
  constructor(value) {

    this.walk(value)
  }
  walk (data) {

    Object.keys(data).forEach(v => {
      defineReactive(data, v)
    })
  }
}

function observe (data) {
  let ob = new Observer(data);
}



function defineReactive (obj, key) {
  let dep = new Dep();
  let val = obj[key];
  Object.defineProperty(obj, key, {
    get: function () {

      if (Dep.target) {
        dep.depend()
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