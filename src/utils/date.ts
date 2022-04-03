export const getUTCFullTime = (
  data: any,
  separator: string,
  rem = null,
  add = null,
) => {
  const time = new Date(data)
  let year = time.getUTCFullYear()
  let month: any = time.getUTCMonth() + 1
  let day: any = time.getUTCDate()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day

  if (rem) {
    year = year - rem
    time.setUTCFullYear(year)
  }
  if (add) {
    year = year + add
    time.setUTCFullYear(year)
  }

  return `${year}${separator}${month}${separator}${day}`
}

export const numberOfWeeks = (d1: any, d2: any) =>
  Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000))
