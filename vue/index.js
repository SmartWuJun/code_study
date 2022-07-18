

function Vue (options) {

  this._options = options;

  let { data } = options;
  this._data = data;

  initState(data)

}

Vue.prototype.$mount = function (el) {

  new Watcher(this, () => {
    let content = `名称：${this._data.name}，年龄：${this._data.age}`;

    document.getElementById(el).innerHTML = content;
  })

}




function initState (data) {
  observe(data)

}