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
    // let content = `名称：${this.name}; 计算属性： ${this.newMsg}`;
    let content = `计算属性： ${this.msg}`;

    document.getElementById(el).innerHTML = content;
  });
};
