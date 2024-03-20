export const actionObject = (type: string, payload: any = null) => {
  return {type, payload}
}

export const randomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]

  return color
}

export const getLastDate = (item: any, lastPayment: any) => {
  const date = new Date(lastPayment?.date)
  switch (item?.frecuency_type) {
    case 'days':
      const lastDay = Number(
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      )
      const nextDay = Number(date.getDate()) + Number(item?.frecuency_time)
      if (nextDay > lastDay) {
        const returnDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          nextDay - lastDay,
        )
        return returnDate
      }
      const returned = new Date(date.getFullYear(), date.getMonth(), nextDay)
      return returned
    case 'weeks':
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + Number(item?.frecuency_time) * 7,
      )
    case 'months':
      return new Date(
        date.getFullYear(),
        date.getMonth() + Number(item?.frecuency_time),
        date.getDate(),
      )
    default:
      return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
}
