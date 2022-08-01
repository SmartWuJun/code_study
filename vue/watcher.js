


let id = 0;
class Watcher {
  id = 0;
  deps = [];
  newDeps = [];
  depIds = new Set();
  newDepIds = new Set();
  value = ''
  constructor(vm, expOrFn, cb, options) {
    this.id = id++;
    this.vm = vm;

    if (options) {
      this.lazy = !!options.lazy;
    }
    //lazy 表示是否是计算属性， dirty 标志该计算属性是否需要重新计算
    this.dirty = this.lazy;

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = function (obj) {
        return obj[expOrFn];
      };
    }
    //一开始 计算属性不需要计算 
    this.value = this.lazy ? undefined : this.get();
    this.cb = cb;
  }
  addDep (dep) {
    let id = dep.id;
    // if (!this.newDepIds.has(id)) {
    //   this.newDepIds.add(id);
    //   this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this)
      this.depIds.add(id);
      this.deps.push(dep)
    }
    // }
  }
  get () {
    // Dep.target = this;
    pushTarget(this)
    let value = this.getter.call(this.vm, this.vm._data);

    // Dep.target = null;
    popTarget();
    return value;

  }
  run () {
    let value = this.get();
    let oldValue = this.value;
    this.cb && this.cb.call(this.vm, value, oldValue);
  }
  update () {
    //计算属性
    if (this.lazy) {
      this.dirty = true;
      console.log('computed update')
    } else {
      // this.get();
      // this.cb && this.cb()
      console.log('watcher update')

      queueWatcher(this)
    }

  }
  evaluate () {
    this.value = this.get();
    this.dirty = false;
  }
  depend () {
    let i = this.deps.length;
    console.log('deps: ', this.deps);
    while (i--) {
      this.deps[i].depend();
    }
  }
}
