import { bar } from "./bar.js"
import userJson from './user.json';
console.log('userJson: ', userJson);


export default function (val) {
  console.log('foo.js:', val)

  bar();
}