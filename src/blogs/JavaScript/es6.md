---
title: "使用ES6+的特性美化代码"
date: "2022-04-11"
tags: "ES6"
categories: "JavaScript"
---

在日常开发中，有些习惯性的ES5的写法如果能够换成ES6的写法，会让代码变得更加简洁美观，也更加易于阅读和后期维护。

### 取值相关

假设有一个对象 `obj` ：

```js
const obj = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5
}
```
想要取 `obj` 中的几个值，可能会这么写：

```js
const a = obj.a;
const b = obj.b;
```
后来，需要用到另外两个变量，再次取值：
```js
const c = obj.c;
const d = obj.d;
// use
const f = obj.a + obj.c;
const g = obj.b + obj.d;
```
数据量小的时候看起来还好，但是数据量大或者对象名较长的时候，就会使得代码中随处可见这个对象名。

这个时候就可以使用ES6的 **解构赋值**，将好几行代码合并为一行：
```js
const { a, b, c, d, e } = obj;
const f = a + c;
const g = b + d;
```
在实际业务场景中，有时候服务端返回的数据对象中属性名并不是前端想要的或者说想要换一个更喜欢的属性名，这时可能会觉得这样写就没用了或者还是需要再次赋值，但是其实解构赋值是可以满足这种需求的，我们可以这么写：
```js
const { a: a1 } = obj;
console.log(a1); // 1
```
**注意：** ES6解构赋值解构的对象不能是 `undefined` 、`null`。否则会报错，所以在需要的时候需要给一个默认值：
```js
const { a, b, c, d } = obj || {};
```

### 合并数据
有时候需要合并两个数组或者两个对象：
```js
const a = [1, 2, 3];
const b = [1, 5, 6];
const c = a.concat(b); // [1, 2, 3, 1, 5, 6]

const obj1 = {
	a: 1
}
const obj2 = {
	b: 2
}
const obj = Object.assign({}, obj1, obj2); // {a: 1, b: 2}
```

这种时候就可以使用ES6的扩展运算符：
```js
const a = [1, 2, 3];
const b = [1, 5, 6];
const c = [...a, ...b]; // [1, 2, 3, 1, 5, 6]
// 还可以做到去重
const d = [...new Set([...a, ...b])]; // [1, 2, 3, 5, 6]

const obj1 = {
	a: 1
}
const obj2 = {
	b: 2
}
const obj = {...obj1, ...obj2}; // {a: 1, b: 2}
```

### if 判断条件
有时会遇到有一些判断条件
```js
if(type == 1 || type == 2 || type == 3 || type == 4) {
	// do something
}
```
可以使用ES6中的数组实例方法 `includes` 改进为：
```js
// 抽离判断条件
const condition = [1, 2, 3, 4];
if(condition.includes(type)) {
	// do something
}
```

### 列表搜索

在项目中，有时需要对列表数据进行搜索筛选，搜索一般分为精确搜索和模糊搜索。一般会用 `filter` 来实现：
```js
const a = [1, 2, 3, 4, 5];
const result = a.filter(item => item === 3);
```
如果是精确搜索的话，可以使用ES6的 `find` 来优化一下， `find` 方法中找到符合条件的项，就不会继续遍历数组，能够稍微节省一点性能：
```js
const a = [1, 2, 3, 4, 5];
const result = a.find(item => item === 3);
```

### 数组的扁平化
假如有这样一个需求：一个部门的JSON数据中，属性名是部门ID，属性值是各部门成员ID数组集合，现在要把所有部门的成员ID都提取到一个数组集合中：
```js
const deps = {
	'采购部':[1,2,3],
	'人事部':[5,8,12],
	'行政部':[5,14,79],
	'运输部':[3,64,105],
}
let member = [];
for(let item in deps) {
	const value = deps[item];
	if(Array.isArray(value)) {
		member = [...member, ...value];
	}
}
member = [...new Set(member)];
```
上面的方法能够实现，但是使用遍历的一个问题是如果数组的深度增加的话，循环嵌套会使得代码性能开销过大，时间复杂度高。

ES6 提供了 `Object.values` 来获取对象的属性值，以及 `flat` 方法来进行数组的扁平化处理：
```js
const deps = {
	'采购部':[1,2,3],
	'人事部':[5,8,12],
	'行政部':[5,14,79],
	'运输部':[3,64,105],
}
let member = Object.values(deps).flat(Infinity);
// Array.flat(deps): deps => 可选，用来指定要提取嵌套数组的结构深度，默认值为 1。
// flat 方法不支持IE浏览器，所以IE浏览器还是需要使用Set()来去重。
```

### 非空判断

在获取对象属性时，可以使用可选链操作符 `?.` 来代替 `&&` 进行对象非空判断
`?.` 直接在链式调用的时候判断，判断左侧的对象是否为 `null` 或 `undefined` ，如果是，就不往下运算，返回 `undefined` ，如果不是，则返回右侧的值。可用来简化 `&&` 和三元运算。
```js
const name = obj && obj.name;
// =
const name = obj?.name;
```

`?？` 运算符是ES2020引入的，也被称为 `null` 判断运算符。
`?？` 运算符类似于 `||` ，但是更严。 `?？` 运算符只有在左侧的值为 `null` 或 `undefined` 时，才会返回右边的值，而 `||` 运算符则是在左侧是空字符串或 `false` 或 `0` 等 `falsy` 值时，都会返回右侧的值。例如 `0 || 1` 的值是 `1` ，而 `0 ?? 1` 的值是 `0`。

因此我们有时可以使用 `??` 来代替 `||` ，有时也可用来简化一些判断条件，例如判断输入框是否有输入的值：
```js
if(value !== null || value !== undefined || value !== '') {
	// do something
}
// shorter
if((value ?? '') !== '') {
	// do something
}
```

### 异步函数
一种常见的使用 Promise 实现的异步函数调用
```js
const fn1 = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(1);
		}, 1000);
	});
}
const fn2 = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(2);
		}, 1000);
	})
}
const fn = () => {
	fn1().then(res1 => {
		console.log(res1); // 1
		fn2().then(res2 => {
			console.log(res2); // 2
		})
	})
}
```
这样调用异步函数，相对来说是一种不好的写法，多了之后，可能会形成传说中的“回调地狱”。可以使用 `async` 和 `await` 来优化
```js
const fn = async() => {
	const res1 = await fn1();
	const res2 = await fn2();
	console.log(res1); // 1
	console.log(res2); // 2
}
```

但是，如果要做到并发请求，需要用到 `Promise.all()`
```js
const fn = () => {
	Promise.all([fn1(), fn2()]).then(res => {
		console.log(res); // [1, 2]
	})
}
```
如果并发请求时，只要其中一个异步函数处理完成就返回结果，那就要用到 `Promise.race()` 。