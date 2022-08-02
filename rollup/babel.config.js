module.exports =
{

  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    ["import", {
      "libraryName": "element-ui", // 组件库名称，对应 import 语法中的包名
      "libraryDirectory": "lib", // 编译之后各个组件单元所在文件夹名称
      "style": true, // 是否引入组件对应样式文件，也可以传入 less 来引入 less 文件
      "styleLibraryDirectory": "lib/theme-chalk", // 编译之后引入的组件样式文件所在文件夹名称
      "camel2DashComponentName": true, // 是否将驼峰命名的导入变量转换为对应的横线连接命名的文件名
      // "customName": (name, file) => { return `/lib/${name}` }, // 自定义编译之后引入的组件名
      "customStyleName": (name, file) => { return `element-ui/lib/theme-chalk/${name}.css` }, // 自定义编译之后引入样式文件的名称

    }]
  ]
}
