import fs from 'fs';
import parser from '@babel/parser';
import traverse from '@babel/traverse';
import path from 'path';
import ejs from 'ejs';
import { transformFromAst } from 'babel-core';

//创建模块
function createAsset (filePath) {
  const source = fs.readFileSync(filePath, { encoding: 'utf-8' });

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

  return { filePath, code, deps }
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
      queue.push(child);
    });
  }

  return queue;

}

// createAsset();
let graph = createGraph();


function build () {
  let template = fs.readFileSync('./bundle.ejs', { encoding: 'utf-8' });
  let code = ejs.render(template, { data: graph })
  // console.log('code: ', code);
  fs.writeFileSync('./dist/bundle.js', code)
}

build()


