// 构造器generator
function* newGer(min){
  let index = 0;
    while(true)
        yield index++;
}
let a = newGer();
console.log(a.next());
console.log(a.next());
console.log(a.next());


function* gen(x) {
  let y = 2 * (yield (x + 1))   // 注意：yield 表达式如果用在另一个表达式中，必须放在圆括号里面
  let z = yield (y / 3)
  return x + y + z
}

let it = gen(5)

console.log(it.next())  //在yield返回 6
console.log(it.next(9)) //上一次的参数为9，y=2*9=18,18/3=6  返回6
console.log(it.next(2)) //5+18+2=25