---
title: "JS页面平滑滚动到顶部"
date: "2022-04-12"
tags: "skill"
categories: "JavaScript"
---
## 页面平滑滚动到顶部的实现方法

### 1. `window.scrollTo` API
在实际业务中经常会碰到需要将页面滚动到顶部的需求，最常见的做法是使用 `window.scrollTo` API：
```js
window.scrollTo(0, 0);
```
`window.scrollTo(x, y)` 通过传入文档中的x，y轴坐标来实现滚动到页面某个位置的功能，但是这样的滚动效果并不是很好，不够丝滑。这个API还可以传入一个option，是一个对象，left值对应x，top值对应y，还有一个值叫behavior，用来定义滚动行为，所以就可以这样来做到平滑滚动到页面顶部：
```js
window.scrollTo({
	left: 0,
	top: 0,
	behavior: 'smooth'
})
```
But

Safari，Edge几个浏览器不支持option选项。

### 2. requestAnimationFrame

requestAnimationFrame的作用是告诉浏览器在下次重绘之前执行传入的回调函数。
```js
const scrollToTop = () => {
	let sTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(sTop > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, sTop - sTop / 5);
	}
}
```
浏览器兼容良好，具体可在 Can I Use上查询。