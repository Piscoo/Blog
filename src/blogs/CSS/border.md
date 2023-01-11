---
title: "CSS实现各类Border"
date: "2023-01-10"
tags: "CSS 知识点"
categories: "CSS"
---

# CSS实现各种类型的Border


### 边框长度变化

<div class="border-length">Hover Change Border Length</div>
通过两个伪类，分别只设置上、左边框和下、右边框，在`hover`时改变伪类的宽高

```
<div class="border-length"></div>
.border-length {
	width: 200px;
	height: 70px;
	position: relative;
	border: 1px solid #03A9F3;
	cursor: pointer;
}
.border-length::before, .border-length::after {
	content: "";
	position: absolute;
	width: 20px;
	height: 20px;
}
		
.border-length::before {
	top: -5px;
	left: -5px;
	border-top: 1px solid #03A9F3;
	border-left: 1px solid #03A9F3;
}
		
.border-length::after {
	right: -5px;
	bottom: -5px;
	border-bottom: 1px solid #03A9F3;
	border-right: 1px solid #03A9F3;
}
	
.border-length:hover::before, .border-length:hover::after {
	width: calc(100% + 10px);
	height: calc(100% + 10px);
}
```

### 虚线边框滚动动画

<div class="dashed-border"></div>

```
<div class="dashed-border"></div>
.dashed-border {
	width: 200px;
	height: 70px;
	background:
		linear-gradient(90deg, pink 50%, transparent 0) repeat-x,
		linear-gradient(90deg, pink 50%, transparent 0) repeat-x,
		linear-gradient(0deg, pink 50%, transparent 0) repeat-y,
		linear-gradient(0deg, pink 50%, transparent 0) repeat-y;
	background-size: 6px 2px, 6px 2px, 2px 6px, 2px 6px;
	background-position: 0 0, 0 100%, 0 0, 100% 0;
	animation: linearGradientMove .3s infinite linear;
}
@keyframes linearGradientMove {
	100% {
		background-position: 6px 0, -6px 100%, 0 -6px, 100% 6px;
	}
}
```

### 角向渐变 `conic-gradient`

<div class="conic-box">
	<div class="conic"></div>
</div>

```
.conic {
	position: relative;
	width: 300px;
	height: 200px;
	margin: 20px;
	border-radius: 10px;
	overflow: hidden;
	padding: 2rem;
	z-index: 1;
}
.conic::before {
	content: '';
	position: absolute;
	left: -50%;
	top: -50%;
	width: 200%;
	height: 200%;
	background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
	background-color: #1a232a;
	background-repeat: no-repeat;
	background-position: 0 0;
	animation: rotate 4s linear infinite;
	z-index: -2;
}
@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}
```

### overflow + transform

<div class="overflow-border-box">
	<div class="overflow-border">Hover Here</div>
</div>


```
.overflow-border {
	width: 200px;
	height: 80px;
	line-height: 80px;
	color: #4884ff;
	text-align: center;
	position: relative;
	margin: 2px;
	overflow: hidden;
	z-index: 1;
}
.overflow-border::before {
	content: "";
	width: calc(100% + 8px);
	height: calc(100% + 8px);
	transform: rotateZ(-90deg);
	background: pink;
	transition: all .3s ease-in-out;
	transform-origin: left bottom;
	position: absolute;
	left: -4px;
	bottom: -4px;
	z-index: -2;
}
.overflow-border::after {
	content: '';
	width: calc(100% - 6px);
	height: calc(100% - 6px);
	position: absolute;
	background: #fff;
	left: 3px;
	top: 3px;
	z-index: -1;
}
.overflow-border:hover::before {
	transform: rotateZ(0);
	z-index: -1;
}
```


<style>
	.border-length {
		width: max-content;
		height: 70px;
		line-height: 70px;
		text-align: center;
		padding: 0 20px;
		margin: 20px 0;
		position: relative;
		border: 1px solid #03A9F3;
		cursor: pointer;
	}
	.border-length::before, .border-length::after {
		content: "";
		position: absolute;
		width: 20px;
		height: 20px;
	}
     
	.border-length::before {
		top: -5px;
		left: -5px;
		border-top: 1px solid #03A9F3;
		border-left: 1px solid #03A9F3;
	}
     
	.border-length::after {
		right: -5px;
		bottom: -5px;
		border-bottom: 1px solid #03A9F3;
		border-right: 1px solid #03A9F3;
	}
		
	.border-length:hover::before, .border-length:hover::after {
		width: calc(100% + 10px);
		height: calc(100% + 10px);
	}
	.dashed-border {
		width: 200px;
		height: 70px;
		background:
			linear-gradient(90deg, pink 50%, transparent 0) repeat-x,
			linear-gradient(90deg, pink 50%, transparent 0) repeat-x,
			linear-gradient(0deg, pink 50%, transparent 0) repeat-y,
			linear-gradient(0deg, pink 50%, transparent 0) repeat-y;
    background-size: 6px 2px, 6px 2px, 2px 6px, 2px 6px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
		animation: linearGradientMove .3s infinite linear;
	}
	@keyframes linearGradientMove {
    100% {
			background-position: 6px 0, -6px 100%, 0 -6px, 100% 6px;
    }
	}
	.conic-box {
		background: #000;
		width: max-content;
		padding: 20px;
	}
	.conic {
    position: relative;
		width: 300px;
		height: 200px;
		margin: 20px;
		border-radius: 10px;
		overflow: hidden;
		padding: 2rem;
		z-index: 1;
	}
	.conic::before {
		content: '';
		position: absolute;
		left: -50%;
		top: -50%;
		width: 200%;
		height: 200%;
		background: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
		background-color: #1a232a;
		background-repeat: no-repeat;
		background-position: 0 0;
		animation: rotate 4s linear infinite;
		z-index: -2;
	}
	.conic::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 6px;
		top: 6px;
		width: calc(100% - 12px);
		height: calc(100% - 12px);
		background: #000;
		border-radius: 5px;
	}
	@keyframes rotate {
		100% {
			transform: rotate(1turn);
		}
	}
	.overflow-border-box {
		background: rgba(72, 132, 255, .2);
		width: max-content;
		padding: 30px;
	}
	.overflow-border {
		width: 200px;
		height: 80px;
		line-height: 80px;
		color: #4884ff;
		text-align: center;
		position: relative;
		margin: 2px;
		overflow: hidden;
		z-index: 1;
	}
	.overflow-border::before {
		content: "";
		width: calc(100% + 8px);
		height: calc(100% + 8px);
		transform: rotateZ(-90deg);
		background: pink;
		transition: all .3s ease-in-out;
		transform-origin: left bottom;
		position: absolute;
		left: -4px;
		bottom: -4px;
		z-index: -2;
	}
	.overflow-border::after {
		content: '';
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    position: absolute;
    background: #fff;
    left: 4px;
    top: 4px;
    z-index: -1;
	}
	.overflow-border:hover::before {
		transform: rotateZ(0);
		z-index: -1;
	}
</style>