// polyfill会转义所有的js语法
// import '@babel/polyfill'
import data from './data/data.json'


console.log('hello webpack');

console.log(data);

import './css/main.css'
import './css/main.less'

const myFun = ()=>{
  console.log('myFun箭头函数执行了');
}
window.myFun = myFun()

const p = new Promise(resolve => {
  setTimeout(() => {
    console.log('promise is working');
    resolve()
  },100)
})

// 以模块的形式引入图片
import bg from './image/2.png';
let img = new Image()
img.src = bg;
console.log(img);
document.body.append(img);

console.log(API_BASE_URL);