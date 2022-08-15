/*
 * @Author: WUJUN
 * @Date: 2022-08-01 08:43:45
 * @Description:
 */
function noop() {}

//设置 代理 是的this 实例直接获取 data 中的属性
function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[sourceKey][key];
    },
    set(v) {
      target[sourceKey][key] = v;
    }
  });
}

function initState(vm) {
  let { data, computed, watch } = vm.$options;
  if (data) {
    initData(vm);
  }

  if (computed) {
    initComputed(vm, computed);
  }

  if (watch) {
    initWatch(vm, watch);
  }
}

function initData(vm) {
  let data = vm._data;
  let keys = Object.keys(data);
  let len = keys.length;
  while (len--) {
    let key = keys[len];
    proxy(vm, "_data", key);
  }

  observe(vm._data);
}

function initWatch(vm, watch) {
  for (const key in watch) {
    new Watcher(vm, key, watch[key]);
  }
}

function initComputed(vm, computed) {
  let keys = Object.keys(computed);
  console.log("keys: ", keys);
  const watchers = (vm._computedWatchers = Object.create(null));

  for (const key in computed) {
    let userDef = computed[key];
    watchers[key] = new Watcher(vm, userDef, noop, { lazy: true });

    defineComputed(vm, key, userDef);
  }
}

function defineComputed(target, key, userDef) {
  Object.defineProperty(target, key, {
    get: createComputedGetter(key)
  });
}

// 用于创建客户端的 conputed 的 getter
// 由于 computed 被代理了，所以当访问到 computed 的时候，会触发这个 getter
function createComputedGetter(key) {
  // 返回一个函数 computedGetter 作为劫持 computed 的 getter 函数
  return function computedGetter() {
    // 每次读取到 computer 触发 getter 时都先获取 key 对应的 watcher
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      // dirty 是标志是否已经执行过计算结果；dirty=true，代表有脏数据，需要重新计算
      // dirty 初始值是 true（在 new Watcher 时确定），所以 computed 首次会进行计算，与 watch 略有差别
      // 如果执行过并且依赖数据没有变化则不会执行 watcher.evaluate 重复计算，这也是缓存的原理
      // 在 watcher.evaluate 中，会先调用 watcher.get 进行求值，然后将 dirty 置为 false
      // 在 watcher.get 进行求值的时候，访问到 data 的依赖数据，触发 data 数据的 get，收集 计算watcher
      if (watcher.dirty) {
        watcher.evaluate();
      }
      console.log("Dep.target: ", Dep.target);
      if (Dep.target) {
        // 进行依赖收集
        // 注意，这里收集的是 渲染watcer，而不是 计算watcher
        watcher.depend();
      }

      // 返回结果
      return watcher.value;
    }
  };
}
