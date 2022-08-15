/*
 * @Author: WUJUN
 * @Date: 2022-07-19 08:18:38
 * @Description:
 */
function Vue(options) {
  this.$options = options;

  let { data } = options;
  this._data = data;

  initState(this);
}

Vue.prototype.$mount = function (el) {
  new Watcher(this, () => {
<<<<<<< HEAD
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

=======
    // let content = `名称：${this.name}; 计算属性： ${this.newMsg}`;
    let content = `计算属性： ${this.msg}`;

    document.getElementById(el).innerHTML = content;
  });
};
>>>>>>> 62d49e4bf5d2bfafa22795abb305048ab4c8c82e
