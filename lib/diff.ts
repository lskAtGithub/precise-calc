import { handleParameter, isOutOfSafeRange, paramType } from './utils'

export function diff(a: string | number, b: string | number): string | number {
  a = handleParameter(a)
  b = handleParameter(b)
  let isNegative = false
  let result = ''

  if (!compareNumberSize(a, b)) {
    ;[a, b] = [b, a]
    isNegative = true
  }
  let [integerA, decimalsA] = a.split('.')
  let [integerB, decimalsB] = b.split('.')

  let decimalsDiff = ''
  let integerDiff = ''
  if (decimalsA || decimalsB) {
    decimalsDiff = stringDiff(decimalsA, decimalsB, paramType.DECIMALS)
    let isCarry = decimalsDiff.split(':')
    if (isCarry.length > 1) {
      decimalsDiff = isCarry[1]
      integerA = (+integerA - 1).toString()
    }
  }
  if (integerA || integerB) {
    integerDiff = stringDiff(integerA, integerB, paramType.INTEGER)
  }
  result = integerDiff + (decimalsDiff ? `.${decimalsDiff}` : '')
  if (isNegative) {
    result = '-' + result
  }
  if (!isOutOfSafeRange(result)) {
    return Number(result)
  }
  return result
}

function stringDiff(
  num1: string = '0',
  num2: string = '0',
  type: paramType
): string {
  const maxLen = Math.max(num1.length, num2.length)
  if (type === paramType.INTEGER) {
    num1 = num1.padStart(maxLen, '0')
    num2 = num2.padStart(maxLen, '0')
  } else {
    num1 = num1.padEnd(maxLen, '0')
    num2 = num2.padEnd(maxLen, '0')
  }
  let result = ''
  let carry = 0

  for (let i = maxLen - 1; i >= 0; i--) {
    let num = 0
    if (+num1[i] < +num2[i] + carry) {
      num = +num1[i] + 10 - +num2[i] - carry
      carry = 1
    } else {
      num = +num1[i] - +num2[i] - carry
    }
    result = num + result + ''
  }
  if (carry) {
    result = carry + ':' + result
  }
  return result
}

// 比较字符串a 是否大于字符串 b
function compareNumberSize(a: string, b: string): boolean {
  let [integerA] = a.split('.')
  let [integerB] = b.split('.')
  if (integerA.length > integerB.length) return true
  if (integerA.length < integerB.length) return false
  return +a - +b >= 0
}
