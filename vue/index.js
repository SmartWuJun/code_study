

function Vue (options) {
  this.$options = options;

  let { data } = options;
  this._data = data;

  initState(this)

}

Vue.prototype.$mount = function (el) {

  new Watcher(this, () => {

    let content = `名称：${this.name}; 计算属性： ${this.msg}`;

    document.getElementById(el).innerHTML = content;
  })

}

