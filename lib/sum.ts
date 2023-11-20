import { handleParameter, isOutOfSafeRange, paramType } from './utils'

export function sum(...args: (number | string)[]): number | string {
  if (args.length === 0) {
    return 0
  }
  if (args.length === 1) {
    return args[0]
  }
  const nums: string[] = args.map((item) => handleParameter(item))
  let result: string | number = ''
  let integerSum: string = '0'
  let decimalsSum: string = '0'
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const [integer, decimals] = num.split('.')
    if (decimals) {
      decimalsSum = stringSum(decimalsSum, decimals, paramType.DECIMALS)
      if(decimalsSum.length > 1) {
        integerSum = +integerSum + 1 +''
        decimalsSum = decimalsSum.slice(1)
      }
    }
    if (integer) {
      integerSum = stringSum(integerSum, integer, paramType.INTEGER)
    }
  }
  result = integerSum + '.' + decimalsSum
  if (!isOutOfSafeRange(result)) {
    return Number(result)
  }
  return result.replace(/0+$/, '')
}

function stringSum(num1: string, num2: string, type: paramType): string {
  const maxLen: number = Math.max(num1.length, num2.length)
  if (type === paramType.INTEGER) {
    num1 = num1.padStart(maxLen, '0')
    num2 = num2.padStart(maxLen, '0')
  } else {
    num1 = num1.padEnd(maxLen, '0')
    num2 = num2.padEnd(maxLen, '0')
  }
  let result: string = ''
  let carry: number = 0
  for (let index = maxLen - 1; index >= 0; index--) {
    const num = +num1[index] + +num2[index] + carry
    result = (num % 10) + result
    carry = Math.floor(num / 10)
  }
  if (carry === 1) {
    result = carry + result
  }
  return result
}
