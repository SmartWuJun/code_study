class Dep {
  target = null;
  subs = [];
  constructor() {

  }
  notify () {
    this.subs.forEach(v => v.update())
  }
  depend () {
    // 将 dep 添加进 watcher
    if (Dep.target) {
      // Dep.target.addDep(this)
      this.subs.push(Dep.target)
    }
  }
}

