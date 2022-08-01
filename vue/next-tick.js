const callbacks = [] // 用于存放回调函数数组
let pending = false

// 作为 微任务 或者 宏任务 的回调函数
// 例如：setTimeout(flushCallbacks, 0)
function flushCallbacks () {
  pending = false
  // 从 callbacks 中取出所有回调回调函数，slice(0)相当于复制一份
  const copies = callbacks.slice(0)
  // 将 callbacks 数组置空
  callbacks.length = 0
  // 遍历执行每一个回调函数 flushSchedulerQueue
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc;
if (typeof Promise !== 'undefined') {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  }
}


function nextTick (cb) {
  callbacks.push(() => {
    if (cb) {
      cb.call();
    }
  })

  if (!pending) {
    pending = true;
    timerFunc();
  }
}