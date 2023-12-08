const Grands = 1_000
const Mils = 1000 * Grands
const Bils = 1000 * Mils

export function formatNumberInNotion(
  num: number,
  delimiter: number,
  sym: string
): string | undefined {
  if (num >= delimiter) {
    const int = Math.trunc(num / delimiter)
    const [_, decimal] = (num / delimiter).toFixed(1).split('.')

    return decimal === '0' ? `${int}${sym}` : `${int}.${decimal}${sym}`
  }
}

export function formatNumberCompact(num: number): string {
  return (
    formatNumberInNotion(num, Bils, 'B') ??
    formatNumberInNotion(num, Mils, 'M') ??
    formatNumberInNotion(num, Grands, 'K') ??
    num.toString()
  )
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
