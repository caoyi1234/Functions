//赋值，深拷贝与浅拷贝
/*
  1.赋值相当于两个元素是联动的，一个改变另一个必然改变
  2.浅拷贝当只有一层时不会联动，但是当要拷贝的元素中有对象嵌套时，嵌套的对象中的值依然是联动的
  3.深拷贝，两个元素分配了各自的内存地址，不会出现联动现象
*/

// 实现对象深拷贝
function deepCopyObj(target){
  if(typeof target  === 'object') {
    let cloneTarget = {}
    for(const key in target) cloneTarget[key] = deepCopyObj(target[key])
    return cloneTarget
  } else {
    return target
  }
}


//考虑数组
function deepCopyArr(target){
  if(typeof target  === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}//判断类型去定义
    for(const key in target) {
      cloneTarget[key] = deepCopyArr(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

let obj = {
  id:1,
  // arr: [1,2,45,7]
}
// obj.souce = obj;   //当obj的内容当中存在嵌套时方法会报错，递归栈溢出
// console.log(obj);
let newObj = cloneUseMap(obj);
// console.log(obj.arr.length);
// console.log(newObj.arr.length); //undefined 当数组被深拷贝时会成为一个对象，不具有length属性


function cloneUseMap(target, map = new Map()) {
  if (typeof target === 'object') {
      let cloneTarget = Array.isArray(target) ? [] : {};
      if (map.get(target)) {
          return map.get(target);  //使用map类型直接抛出，不用再次循环递归导致溢出
      }
      map.set(target, cloneTarget);
      for (const key in target) {
          cloneTarget[key] = cloneUseMap(target[key], map);
      }
      return cloneTarget;
  } else {
      return target;
  }
};



//Map 与 WeakMap,强引用与弱引用