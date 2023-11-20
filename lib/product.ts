import { handleParameter, isOutOfSafeRange } from './utils'

export function product(
  a: string | number,
  b: string | number
): string | number {
  a = handleParameter(a)
  b = handleParameter(b)
  let result: number | string = ''
  const precision =
    (a.split('.')[1] || '').length + (b.split('.')[1] || '').length
  const intNum1 = parseInt(a.toString().replace('.', ''))
  const intNum2 = parseInt(b.toString().replace('.', ''))
  result = intNum1 * intNum2
  result = result / Math.pow(10, precision) + ''
  if (isOutOfSafeRange(result)) {
    return result
  }
  return Number(result)
}
