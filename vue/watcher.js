/*
 * @Author: WUJUN
 * @Date: 2022-07-19 08:18:38
 * @Description:
 */
let id = 0;
class Watcher {
  id = 0;
  constructor(vm, expOrFn, cb) {
    id++;
    this.id = id;
    this.vm = vm;
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = function (obj) {
        return obj[expOrFn];
      };
    }
    this.get();
    this.cb = cb;
  }
  addDep() {}
  get() {
    Dep.target = this;

    this.value = this.getter.call(this.vm, this.vm._data);

    Dep.target = null;
  }
  update() {
    this.get();
    this.cb && this.cb();
    console.log("watcher update");
  }
}
