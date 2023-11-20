const paramTypeError =
  'The type of the passed parameter is not a string or number, please check the passed parameter'

const paramValueError =
  'The value of the passed parameter cannot be converted to a valid number. Please check the passed parameter'

/**
 *
 * @description 判断传入参数是否可转为一个合法数字的字符串并返回该字符串
 */
export function handleParameter(param: any): string {
  if (typeof param !== 'number' && typeof param !== 'string') {
    throw new Error(paramTypeError)
  }
  let result = param + ''
  const reg: RegExp = /^\d+(\.\d+)?$/
  if (!reg.test(result)) {
    throw new Error(paramValueError)
  }
  return result
}

/**
 * @description 判断传入参数是否超过了JS最大存储上限
 */
export function isOutOfSafeRange(numStr: string) {
  const max = Number.MAX_SAFE_INTEGER
  const min = Number.MIN_SAFE_INTEGER

  const num = Number(numStr)

  if (Number.isNaN(num)) {
    return false
  }

  if (num > max || num < min) {
    return true
  } else {
    return false
  }
}

export enum paramType {
  INTEGER = 'integer',
  DECIMALS = 'decimals',
}
