import { handleParameter, isOutOfSafeRange } from './utils'

export function quotient(
  a: string | number,
  b: string | number
): string | number {
  a = handleParameter(a)
  b = handleParameter(b)
  let result: number | string = ''
  if (isInteger(a) && isInteger(b)) {
    result = Number(a) / Number(b) + ''
  } else if (!isInteger(a) && !isInteger(b)) {
    const decimalLenA = getDecimalLen(a)
    const decimalLenB = getDecimalLen(b)
    result = (Number(a) * decimalLenA) / (Number(b) * decimalLenB) + ''
  } else if (isInteger(a)) {
    const decimalLenB = getDecimalLen(b)
    result = (Number(a) / (Number(b) * decimalLenB)) * decimalLenB + ''
  } else if (isInteger(b)) {
    const decimalLenA = getDecimalLen(a)
    result = (Number(a) * decimalLenA) / Number(b) / decimalLenA + ''
  }

  if (isOutOfSafeRange(result)) {
    return result
  }
  return Number(result)
}

/**
 *
 * @description 判断是否为整数
 */
function isInteger(param: string) {
  return Number.isInteger(Number(param))
}

function getDecimalLen(param: string): number {
  let result: number = 1
  for (let index = 0; index < param.split('.')[1].length; index++) {
    result *= 10
  }
  return result
}
