/*
 * @Author: WUJUN
 * @Date: 2022-08-02 09:05:06
 * @Description:
 */
let has = {};
let queue = [];

let waiting = false;
let flushing = false; // 是否处于刷新队列状态

let index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = 0;
  has = {};

  waiting = flushing = false;
}
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  console.log("queue: ", queue);
  flushing = true; // 将 flushing 置为 true，代表正在刷新队列
  let watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  // 刷新前先对队列进行排序，保证了：
  //  1、组件的更新顺序为从父级到子级，因为父组件总是在子组件之前被创建 ； 组件创建顺序是从外到内， 挂载是内到外
  //  2、一个组件的用户 watcher 在其渲染 watcher 之前被执行，因为用户 watcher 先于渲染 watcher 创建
  //  3、如果一个组件在其父组件的 watcher 执行期间被销毁，则它的 watcher 可以被跳过
  //从小到大
  queue.sort((a, b) => a.id - b.id);

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  // 使用 queue.length，动态计算队列的长度，没有缓存长度
  // 是因为在执行现有 watcher 期间队列中可能会被 push 进新的 watcher
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    id = watcher.id;
    has[id] = null;

    // 执行 watcher 的 run 去执行相应的更新函数进行页面更新
    // watcher.run 实际上也就是调用 updateComponent 进到页面挂载
    watcher.run();
  }

  // 重置，将 flushing 置为 false
  resetSchedulerState();
}

function queueWatcher(watcher) {
  let id = watcher.id;
  // 同一个属性多次操作 watcher 只记录一次
  if (!has[id]) {
    has[id] = true;
    //不在刷新中
    if (!flushing) {
      queue.push(watcher);
    } else {
      //已经在刷新
      let i = queue.length - 1;
      while (i > index && queue[i].id > id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    }

    // queue the flush
    if (!waiting) {
      waiting = true;

      nextTick(flushSchedulerQueue);
    }
  }
}
