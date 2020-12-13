'use strict'
/**
 * @func
 * @name StringToNumber
 * @desc Number()实现
 * @param {string} value
 */
function StringToNumber (value) {
  // 非 string 类型不处理，String 对象也一样
  if (typeof value !== 'string') return '不是字符串'
  /**
    * 超出 Number.MAX_SAFE_INTEGER (JavaScript 中最大的安全整数(253 - 1))和
    * Number.MIN_SAFE_INTEGER (JavaScript 中最小的安全整数 -(253 - 1))
    * 的数字字符串直接用Number转换会不准确，默认不处理。借助BigInt来判断
    */
  if (value.length >= 16) {
    if (BigInt(value) > BigInt(9007199254740991)) {
      return `${value} 超出限制`
    }
    if (BigInt(value) < BigInt(-9007199254740991)) {
      return `${value} 超出限制`
    }
  }
  return Number(value)
}

console.log('-----test 1-----')
console.log(StringToNumber(new String('test')))// 不是字符串
console.log(StringToNumber('123'))// 123
console.log(StringToNumber('2.'))// 2
console.log(StringToNumber('.1'))// 0.1
console.log('----------')
console.log(StringToNumber(''))// 0
console.log(StringToNumber('0'))
console.log(StringToNumber('+0'))
console.log(StringToNumber('-0'))
console.log('----------')
console.log(StringToNumber('0x400'))// 1024
console.log(StringToNumber('0o2000'))// 1024
console.log(StringToNumber('0b10000000000'))// 1024
console.log('----------')
console.log(StringToNumber('2.048e3'))// 2048
console.log(StringToNumber('2.048e-3'))// 0.002048
console.log('----------')
console.log(StringToNumber('9007199254740993'))// 超出限制
console.log(StringToNumber('-9007199254740992'))// 超出限制

/**
 * @func
 * @name StringToNumber2
 * @desc parseInt()和parseFloat()实现
 * @param {string} value
 */
function StringToNumber2 (value) {
  // console.log(value, '->')
  // 非 string 类型不处理，String 对象也一样
  if (typeof value !== 'string') return '不是字符串'
  // 处理空字符串
  if (value.length === 0) return 0

  if (value.length >= 16) {
    if (BigInt(value) > BigInt(9007199254740991)) {
      return `${value} 超出限制`
    }
    if (BigInt(value) < BigInt(-9007199254740991)) {
      return `${value} 超出限制`
    }
  }

  // 非十进制不能表示小数，用parseInt处理足矣
  // 十六进制
  if (value.startsWith('0x') || value.startsWith('0X')) {
    return parseInt(value.substring(2), 16)
  }
  // 八进制，形如“02000”等字符“0”开头的八进制数字会在严格模式下报错
  if (value.startsWith('0o')) {
    return parseInt(value.substring(2), 8)
  }
  // 二进制
  if (value.startsWith('0b')) {
    // return parseFloat(value.substring(2), 2)
    return parseInt(value.substring(2), 2)
  }

  return parseFloat(value, 10)
}

console.log('-----test 2-----')
console.log(StringToNumber2(new String('test')))// 不是字符串
console.log(StringToNumber2('123'))// 123
console.log(StringToNumber2('123.123'))// 123.123
console.log(StringToNumber2('2.'))// 2
console.log(StringToNumber2('.1'))// 0.1
console.log('----------')
console.log(StringToNumber2(''))
console.log(StringToNumber2('0'))
console.log(StringToNumber2('+0'))
console.log(StringToNumber2('-0'))
console.log('----------')
console.log(StringToNumber2('0x400'))// 1024
console.log(StringToNumber2('0o2000'))// 1024
console.log(StringToNumber2('0b10000000000'))// 1024
console.log('----------')
console.log(StringToNumber2('2.048e3'))// 2048
console.log(StringToNumber2('2.048e-3'))// 0.002048
console.log('----------')
console.log(StringToNumber2('9007199254740993'))// 超出限制
console.log(StringToNumber2('-9007199254740992'))// 超出限制

/**
 * @func
 * @param {number} value
 */
function NumberToString (value, radix = undefined) {
  if (Number.isInteger(value) && !Number.isSafeInteger(value)) return `${BigInt(value)} 超出限制`
  return value.toString(radix)
}

console.log('-----test 3-----')
console.log(NumberToString(123))
console.log(NumberToString(123.123))
/* eslint-disable no-floating-decimal */
console.log(NumberToString(2.))
console.log(NumberToString(.1))
console.log('----------')
console.log(NumberToString(0))
// 带符号的零值可以分开处理，但运算上区分没意义
// 具体办法参考 https://www.cnblogs.com/ziyunfei/archive/2012/12/10/2777099.html
console.log(NumberToString(+0))
console.log(NumberToString(-0))
console.log('----------')
console.log(NumberToString(0x400))
console.log(NumberToString(0o2000))
console.log(NumberToString(0b10000000000))
console.log('----------')
console.log(NumberToString(2.048e3))// 2048
console.log(NumberToString(2.048e-10))// 0.002048
console.log('----------')
console.log(NumberToString(2.048e3, 2))// 2048
console.log(NumberToString(2.048e3, 8))// 2048
console.log(NumberToString(2.048e3, 16))// 2048
console.log('----------')
console.log(NumberToString(9007199254740993))// 超出限制
console.log(NumberToString(-9007199254740992))// 超出限制
