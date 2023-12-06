const CompactNumberFormatter = Intl.NumberFormat('en', {
  notation: 'compact'
})

export function formatNumberCompact(num: number): string {
  return CompactNumberFormatter.format(num)
}

const DateFormatter = Intl.DateTimeFormat('en', {
  day: '2-digit',
  year: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})

export function formatDateLong(date: string) {
  return DateFormatter.format(new Date(date))
}
