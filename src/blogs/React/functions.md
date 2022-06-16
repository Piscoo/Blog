---
title: "React开发中的一些实用函数"
date: "2022-04-14"
tags: "方法"
categories: "React系列"
---

## 随机生成密码
随机生成一个至少包含一个数字一个小写字母一个大写字母以及一个特殊字符的密码串

```ts
const generateRandomPassword = (len) => {
	const psdArr: string[] = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '1234567890', '!@#$%&*()'];
	let password: string[] = [];
	let n = 0;
	for(let i = 0; i < len; i++) {
		// if password length less than the target length - 4, all value random
		if(password?.length < (len - 4)) {
			// get a random item from password array,then get a random value from the random item;
			const randomIndex = Math.floor(Math.random() * 4);
			const passwordItem = psdArr[randomIndex];
			const str = passwordItem[Math.floor(Math.random() * passwordItem.length)];
			password.push(str);
		} else {
			// if password length large than the target length - 4, the reset 4 value will be each one of the psdArr, to make sure each type of password is contained
			let newItem = psdArr[n];
			let lastItem = newItem[Math.floor(Math.random() * newItem.length)];
			let spliceIndex = Math.floor(Math.random() * password.length);
			password.splice(spliceIndex, 0, lastItem);
			n++;
		}
	}
	return password.join('');
```
## 正则校验密码的强弱程度
```ts
// level 1-5，密码强度升级
const calcStrength = (psd: string): string => {
	// 弱密码：6个字符以上，全是数字或全是字母
	const weakReg = /^[0-9]{6,}$|^[a-zA-Z]{6,}$/;
	// 中密码：6个字符以上，至少一个数字一个字母，其他的任意
	const mediumReg = /^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{6,}$/;
	// 强密码：6个字符以上，至少一个数字一个大写字母一个小写字母一个特殊字符
	const strongReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?\(\)]).*$/;
	if(!psd || psd.length < 6) {
		return 'level 1';
	} else if(psd.match(weakReg)) {
		return 'level 2';
	} else if(psd.match(mediumReg)) {
		return 'level 3'
	} else if(psd.match(strongReg)) {
		if(psd.length >= 12) {
			return 'level 5';
		} else {
			return 'level 4';
		}
	}
}
```