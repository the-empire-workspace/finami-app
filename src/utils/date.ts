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
export const nextEntry = (
  fecha: Date,
  frecuencia: number,
  tipoFrecuencia: string,
): Date => {
  let proximoPago = new Date(fecha)

  switch (tipoFrecuencia) {
    case 'days':
      while (proximoPago < new Date())
        proximoPago.setTime(
          proximoPago.getTime() + frecuencia * 24 * 60 * 60 * 1000,
        )

      break
    case 'weeks':
      while (proximoPago < new Date())
        proximoPago.setTime(
          proximoPago.getTime() + frecuencia * 7 * 24 * 60 * 60 * 1000,
        )

      break
    case 'months':
      while (proximoPago < new Date())
        proximoPago.setMonth(proximoPago.getMonth() + frecuencia)

      break
    case 'years':
      while (proximoPago < new Date())
        proximoPago.setFullYear(proximoPago.getFullYear() + frecuencia)

      break
    default:
      throw new Error(`Tipo de frecuencia no soportado ${tipoFrecuencia}`)
  }

  return proximoPago
}
