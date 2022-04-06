---
title: "JavaScript 柯里化函数"
date: "2022-03-20"
tags: "柯里化"
categories: "JavaScript"
---

![Currying](@/images/JS/curry.png)
# 柯里化

> [柯里化(Currying)](https://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96)，是把接收多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

柯里化是一种函数的转换，它是指将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)` 。
柯里化不会调用函数，它只是对函数进行转换。

```js
// example: 
// 创建一个辅助函数  currying(f)
// 对两个参数的函数 f 执行柯里化
// 也就是说，将函数 f(a, b) 转换为以 f(a)(b) 形式运行的函数。
function currying(f) {
	return function(a) {
		return function(b) {
			return f(a, b);
		};
	};
}
// 用法
function sum(a, b) {
	return a + b;
}
let curriedSum = currying(sum);
console.log(curriedSum(1)(2)); // 1 + 2 = 3;
```

上面简单的的实现过程也相对简单：
- `currying(f)` 的结果就是 一个 包装器(wrapper) `function(a)`
- 当它被像 `curriedSum(1)` 这样调用的时候，参数会被保存在词法环境中(Lexical Environment)，然后返回一个新的包装器 `function(b)` 。
- 然后这个包装器被以 2 为参数调用，并且它将调用传递给最初的 `sum` 函数。

这个例子只是简单的展示如何对两个参数的函数进行柯里化。

柯里化更高级的实现，像 lodash 库的 [_.curry](https://lodash.com/docs#curry)方法，会返回一个允许函数被正常或者以偏函数(partial) 的方式调用的包装器：
```js
function sum(a, b) {
	return a + b;
}
// using _.curry from lodash library
let curriedSum = _.curry(sum);
// 正常的调用仍然是允许的
alert(curriedSum(1, 2));
// 以偏函数的形式调用
alert(curriedSum(1)(2));
```

## 为什么要柯里化？

我们用一个现实中有意义的例子来理解柯里化的益处。

例如，一个用来格式化和输出信息的的日志记录函数 `log(date, importance, message)` 。在实际项目中类似的函数有许多很有用的功能，比如通过网络发送日志。这里我们以 `alert` 为例。
```js
function log(date, importance, message) {
	alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```
将其柯里化
```js
log = _.curry(log);
```
柯里化之后，`log` 仍正常运行
```js
log(new Date(), "DEBUG", "some debug");
```
但是也可以以柯里化形式运行
```js
log(new Date())("DEBUG")("some debug");
```
现在我们可以很轻松的为当前的日志创建便捷的函数：
```js
// logNow 将会是一个第一个参数固定的 log 的偏函数
let logNow = log(new Date());

// 调用logNow
logNow("INFO", "message");
// result: [HH: MM] [INFO] message
```
现在，`logNow`  是第一个参数固定的 `log` ，换句话说就是更简短的“偏应用函数(partially applied function)” 或者“偏函数(partial)”。

我们可以进一步地为当前调试日志创建一个便捷的方法：
```js
let debugNow = logNow("DEBUG");
debugNow("message");
// res: [HH:MM] DEBUG message
```
所以：
1. 我们不会在柯里化之后丢失任何东西： `log` 仍然可以被正常调用
2. 我们可以轻松的生成类似 *今日日志* 这样的偏函数

## 高级的柯里化实现
如果你想了解其中的细节，下面是一个用于多个参数的“高级”柯里化的实现，也可以用于上面的例子。
```js
function curry(func) {
	return function curried(...args) {
		if(args.length >= func.length) {
			return func.apply(this, args);
		} else {
			return function(...args2) {
				return curried.apply(this, args.concat(args2));
			}
		}
	};
}
```
调用：
```js
function sum(a, b, c) {
	return a + b + c;
}
let curriedSum = curry(sum);
// 仍可正常调用
console.log(curriedSum(1, 2, 3));
// 柯里化第一个参数
console.log(curriedSum(1)(2, 3));
// 全部柯里化
console.log(curriedSum(1)(2)(3));
```
新的 `curry` 函数也许看起来很复杂，其实很好理解。
`curry(func)` 的结果是一个如下所示的包装器 `curried`：
```js
// func 是要转化的函数
function curried(...args) {
	if(args.length >= func.length) {
		reutrn func.apply(this, args);
	} else {
		return function(...args2) {
			return curried.apply(this, args.concat(args2));
		}
	}
}
```
运行时，有两个执行分支 `if` ：
1. 如果传递的 `args` 的数量 >=  原函数定义的参数个数( `func.length` )，那么就直接用 `func.apply` 将调用传递给它就行了
2. 否则，返回一个偏函数：暂时先不调用 `func` 。而是返回另一个包装器，这个包装器会将之前的参数和新的参数一起作为参数重新调用 `curried` 。
然后，如果再次调用，将会得到一个新的偏函数（如果参数不足）或者得到最终结果。

### Tips
1. **只支持参数个数固定的函数**
柯里化要求函数的参数数量固定。
用rest参数的函数不能以这种方式柯里化。如：`func(...args)`
2. **比柯里化多一点**
根据定义，柯里化应该将 `sum(a, b, c)` 转化为 `sum(a)(b)(c)`.
但是JS中大多数柯里化的实现都是更高级的，像之前说过的那样，柯里化保证函数能够被多变体函数调用。

## 总结
*柯里化* 是一种让 `f(a, b, c)` 这种形式的函数可以被以 `f(a)(b)(c)` 这种形式调用的转换。JS 实现通常都会保证函数可以被以原样正常调用以及在参数不足时返回偏函数。
柯里化让我们可以很轻松的获得偏函数。就像之前的日志 `log` 例子，一个普通的三参数函数 `log(data, importance, message)` 在柯里化之后，当用一个参数 `log(date)` 或者两个参数 `log(date, importance)` 的方式去调用时会返回偏函数。  


手动翻译自[原文](https://javascript.info/currying-partials)