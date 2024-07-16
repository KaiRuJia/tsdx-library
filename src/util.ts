export function daysBetweenDate(startDate: string, endDate: string) {
  const _startDate: Date = new Date(startDate)
  const _endDate: Date = new Date(endDate)
  const diffMs = Math.abs((_endDate as any) - (_startDate as any))
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return diffDays
}

// console.log(daysBetweenDate('2024-07-01', '2024-07-08'))

export function compose(...funcs: any) {
  if (funcs.length === 0) return (arg: any) => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a: any, b: any) => {
    return  (...args: any) => a(b(...args))
  })
}

// const add = (x: number) => {
//   return x + 1
// }

// const double = (x: number) => {
//   return x * 2
// }
// const composeFunc = compose(add, double)
// console.log(composeFunc(3)) // (3 * 2) + 1

