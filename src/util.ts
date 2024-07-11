export function daysBetweenDate(startDate: string, endDate: string) {
  const _startDate: Date = new Date(startDate)
  const _endDate: Date = new Date(endDate)
  const diffMs = Math.abs((_endDate as any) - (_startDate as any))
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return diffDays
}

console.log(daysBetweenDate('2024-07-01', '2024-07-08'))
