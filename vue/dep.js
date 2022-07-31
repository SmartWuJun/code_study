let uid = 0;
class Dep {
  target = null;
  subs = [];
  constructor() {
    this.id = uid++
  }
  notify () {
    this.subs.forEach(v => v.update())
  }
  addSub (watcher) {
    this.subs.push(watcher)
  }
  depend () {
    // 将 dep 添加进 watcher
    if (Dep.target) {
      Dep.target.addDep(this)
      // this.subs.push(Dep.target)
    }
  }
}


// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = [] // 存储 watcher 的栈

// 开放出去的方法，主要用来往 Dep 类上添加 target（也就是 watcher）
function pushTarget (target) {
  targetStack.push(target)
  Dep.target = target
}

function popTarget () {
  // 删除 targetStack 最后一个 watcher
  targetStack.pop()
  // 如果 targetStack=[]，那么 targetStack[targetStack.length - 1] 的结果是 undefined
  Dep.target = targetStack[targetStack.length - 1]
}