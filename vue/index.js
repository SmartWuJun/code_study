

function Vue (options) {
  this.$options = options;

  let { data } = options;
  this._data = data;

  initState(this)

}

Vue.prototype.$mount = function (el) {

  new Watcher(this, () => {
    // Object.keys(this.obj).forEach

    // let content = `名称：${this.obj && this.obj.xxx}`;
    let content = `名称：${JSON.stringify(this.obj)}`;

    document.getElementById(el).innerHTML = content;
  })

}

Vue.prototype.$set = function (target, key, val) {

  let ob = target.__ob__;
  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

