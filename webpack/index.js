import fs from 'fs';
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import path from 'path';
import ejs from 'ejs';
import { transformFromAst } from 'babel-core';
import jsonLoader from './jsonLoader.js';
import jsonLoader1 from './jsonLoader1.js';

//链式调用 函数  从右往左
const compose = (funs) => {
  return funs.reduce((a, b) => (...args) => a(b(...args)));
}

let loaderConfig = [
  {
    test: /\.json$/,
    use: [jsonLoader, jsonLoader1]
  }
]

let id = 0;
//创建模块
function createAsset (filePath) {
  let source = fs.readFileSync(filePath, { encoding: 'utf-8' });

  loaderConfig.forEach(({ test, use }) => {
    if (test.test(filePath)) {

      if (Array.isArray(use)) {
        // source = use[0](source)
        let chain = compose(use);
        source = chain(source);
      }
    }
  });

  const ast = parser.parse(source, {
    sourceType: 'module'
  })
  // console.log('ast: ', ast);
  let deps = []

  traverse.default(ast, {
    ImportDeclaration ({ node }) {
      console.log('data: ', node.source.value);
      deps.push(node.source.value);
    }
  })

  let { code } = transformFromAst(ast, null, { presets: 'env' })
  console.log('code: ', code);

  return { filePath, code, deps, mapping: {}, id: id++ }
}

//创建图对象，广度优先搜索
function createGraph () {
  let mainAsset = createAsset('./examples/main.js');
  let queue = [mainAsset];

  for (const asset of queue) {
    asset.deps.forEach(relativePath => {
      let realPath = path.resolve('./examples', relativePath);
      // console.log('realPath: ', realPath);
      let child = createAsset(realPath);
      asset.mapping[relativePath] = child.id
      queue.push(child);
    });
  }

  return queue;

}

// createAsset();
let graph = createGraph();


function build () {
  let template = fs.readFileSync('./bundle.ejs', { encoding: 'utf-8' });
  let data = graph.map(v => {
    let { id, mapping, code } = v;
    return { id, mapping, code }
  })
  // console.log('data: ', data);
  let code = ejs.render(template, { data })
  // console.log('code: ', code);
  fs.writeFileSync('./dist/bundle.js', code)
}

build()


