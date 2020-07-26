title: form 表单校验剖析
speaker: 吴军
plugins:
    - echarts

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# form 表单校验剖析 {.text-landing.text-shadow}

By 吴军 {.text-intro}


<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

## 目录
---

* 项目中的表单校验
* provide / inject
* emmiter(dispatch/broadcast ) 
* async-validator 
* form表单校验

<slide class='size-50 aligncenter'>

#### 你的表单校验是否听话？

<slide>


##### provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。


<slide :class="size-40 aligncenter">
#### provide/inject
---

```
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

<slide :class="size-40 aligncenter">
##### dispatch&broadcast 
---
```
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```
<slide :class="size-50 aligncenter">
校验库

[async-validator](https://github.com/yiminghe/async-validator)


<slide :class="size-50 aligncenter">

## form 表单组件
---
- ft-form
- ft-form-item
- ft-input 

<slide :class="size-50 aligncenter">

## 效果

```
 <div>
    <ft-form ref="form" :model="form" :rules="rules">
      <ft-form-item label="name" prop="name">
        <ft-input v-model="form.name"></ft-input>
      </ft-form-item>
      <ft-form-item label="desc" prop="desc">
        <ft-input v-model="form.desc"></ft-input>
      </ft-form-item>
      <ft-form-item label="age" prop="age">
        <ft-input v-model="form.age"></ft-input>
      </ft-form-item>
    </ft-form>
    <el-button @click="submit">提交</el-button>
  </div>
```

<slide :class="size-50 aligncenter">

## 两种触发方式
---
- form表单提交校验
- 子组件 blur或change触发 


<slide :class="size-50 aligncenter">
## form表单提交校验

<slide :class="size-50 aligncenter">
## 子组件 blur或change触发 

<slide :class="size-50 aligncenter">
## 算了 直接上代码吧！