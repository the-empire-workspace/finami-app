import {numberOfWeeks} from './date'

const _getDeep = (data: any, deep: any) => {
  if (typeof deep === 'string') data = data[deep]

  if (Array.isArray(deep)) for (let layer of deep) data = data[layer]

  return data
}

const _compareArray = (data: any, comparison: any, key: any) => {
  for (let item of data) if (item[key] === comparison) return true
}

export const orderBy = (array: any, key: any, type = 'desc', deep = null) => {
  return array?.sort((a: any, b: any) => {
    a = _getDeep(a, deep)
    b = _getDeep(b, deep)

    if (a[key] > b[key] && type === 'asc') return 1
    if (a[key] < b[key] && type === 'asc') return -1
    if (a[key] < b[key] && type === 'desc') return 1
    if (a[key] > b[key] && type === 'desc') return -1
    return 0
  })
}

export const filter = (
  nodes: Array<any>,
  comparison: any,
  key: any,
  deep = null,
) => {
  const nodeFilter = (node: any) => {
    let validation = true
    let validFilter: any = false
    let deeps = _getDeep(node, deep)
    let select = deeps[key]
    validFilter = select === comparison
    if (typeof select === 'string')
      validFilter = select.toLowerCase().includes(comparison.toLowerCase())
    if (Array.isArray(deeps))
      validFilter = _compareArray(deeps, comparison, key)
    return validation && validFilter
  }

  return comparison ? nodes.filter(nodeFilter) : nodes
}

export const simplifyArray = (array: any) => {
  let indexes: any = []
  return array.filter((item: any) => {
    const id = item?.translation?.id
    if (!indexes.includes(id)) {
      indexes.push(id)
      return true
    }
  })
}

export const verifyId = (params: any, newFormData: any, IncomingItems: any) => {
  if (params?.item) {
    const index = IncomingItems.findIndex(
      (income: any) => income.id === params?.item.id,
    )
    IncomingItems.splice(index, 1, newFormData)
  } else {
    const index = IncomingItems.findIndex(
      (income: any) => income.id === newFormData.id,
    )
    if (index >= 0) {
      IncomingItems.splice(index, 1, newFormData)
      return IncomingItems
    }
    newFormData.id = IncomingItems.length
      ? IncomingItems[IncomingItems.length - 1].id + 1
      : 0
    IncomingItems.push(newFormData)
  }
  return IncomingItems
}

export const getDeep = (categoryIds: any, IncomingItems: any) => {
  const deep = []

  for (let i = 0; i < categoryIds.length; i++) {
    if (i === 0) {
      const it = IncomingItems.find((item: any) => item.id === categoryIds[i])
      deep.push(it)
      continue
    }
    const it: any = deep[i - 1].entries.find(
      (item: any) => item.id === categoryIds[i],
    )
    if (it) deep.push(it)
  }
  return deep
}

export const getDeepItem = (categoryIds: any, IncomingItems: any, id: any) => {
  const deep = getDeep(categoryIds, IncomingItems)
  return deep[deep.length - 1].entries.find((entry: any) => entry.id === id)
}

export const processCategoryDeep = (
  categoryIds: any,
  IncomingItems: any,
  params: any,
  newFormData: any,
  del?: any,
) => {
  const deep = getDeep(categoryIds, IncomingItems)

  const deepModify = deep[deep.length - 1]
  if (del) {
    const index = deepModify.entries.findIndex(
      (income: any) => income.id === newFormData.id,
    )
    deepModify.entries.splice(index, 1)
  } else deepModify.entries = verifyId(params, newFormData, deepModify.entries)

  deep[deep.length - 1] = deepModify

  const merge = deep.reverse().reduce((prev, next, index) => {
    if (index !== 0) next.entries = verifyId(params, prev, next.entries)
    return next
  }, {})

  return merge
}

export const processEntries = (
  array: any = [],
  prices: any = {},
  prevCurrent = null,
) => {
  const reduceArray = array
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const totals = reduceArray.reduce(
    (prev: any, next: any, index: any) => {
      if (prevCurrent && index === 0) prev = prevCurrent

      const price = prices[next.currency]

      let amount = next.amount
      if (price) {
        if (price.op === 'multiply') amount = next.amount * price.value
        if (price.op === 'divide') amount = next.amount / price.value
      }

      if (next.paymentType === 'unique') {
        if (next.status === 'pending') prev.pending += amount
        if (next.status === 'paid') prev.total += amount

        if (
          next.payment_date > firstDay.getTime() &&
          next.payment_date < lastDay.getTime()
        )
          prev.monthly += amount
      }

      if (next.paymentType === 'concurrent') {
        if (next.frequency === 'months')
          prev.monthly += amount / Number(next.amount_frequency)
        if (next.frequency === 'weeks') {
          const weeks = numberOfWeeks(firstDay, lastDay)
          const weeksDifference = weeks / Number(next.amount_frequency)
          prev.monthly += amount * weeksDifference
        }
        for (const entry of next.entries) {
          let entryAmount = entry.amount
          if (price) entryAmount = entry.amount * price.value
          if (entry.status === 'pending') prev.pending += entryAmount
          if (entry.status === 'paid') prev.total += entryAmount
        }
      }

      if (next.category) prev = processEntries(next.entries, prices, prev)

      return prev
    },
    {monthly: 0, total: 0, pending: 0},
  )

  return reduceArray.length ? totals : prevCurrent
}

export const filterEntries = (
  array: any,
  from: any,
  to: any,
  prevCurrent: any = null,
) => {
  const reduceArray = array
  const totals = reduceArray.reduce((prev: any, next: any, index: any) => {
    if (prevCurrent && index === 0) prev = prevCurrent
    const date = next.payment_date || next.date

    if (next.paymentType === 'unique')
      if (date >= from && date <= to) prev.push(next)

    if (next.paymentType === 'concurrent') {
      const newEntries = []
      for (const entry of next.entries) {
        const entryDate = entry.payment_date || entry.date
        if (entryDate >= from && entryDate <= to) newEntries.push(entry)
      }
      next.entries = newEntries
    }

    if (next.category) prev = filterEntries(next.entries, from, to, prev)

    return prev
  }, [])
  return totals
}

export const filterByCurrency = (
  currency: any,
  itemsIncomings: any,
  itemsOutcomings: any = null,
) => {
  const reduceFunc = (prev: any, next: any) => {
    if (next.currency === currency?.id) prev.push(next)
    if (next.type === 'category')
      for (const entry of next.entries)
        if (entry.currency === currency?.id) prev.push(next)

    return prev
  }

  const incomingsReduce = itemsIncomings
    ? itemsIncomings.reduce(reduceFunc, [])
    : []
  const outcomingReduce = itemsOutcomings
    ? itemsOutcomings.reduce(reduceFunc, [])
    : []

  const fullItems = [...incomingsReduce, ...outcomingReduce]

  const orderItems = fullItems.sort((a: any, b: any) => {
    const aDate = a.date || a.payment_date
    const bDate = b.date || b.payment_date
    if (aDate < bDate) return 1
    if (aDate > bDate) return -1
    return 0
  })

  return orderItems
}

export const processNotification = (
  array: any,
  type: any,
  indicator: any,
  prevNot: any = null,
) => {
  let notifications = prevNot || []

  const now = new Date()

  for (const entry of array) {
    const itemEntry =
      entry?.entries && entry.paymentType === 'concurrent'
        ? entry?.entries[entry?.entries?.length - 1]
        : []
    const status = itemEntry?.status || entry.status
    if (status === 'pending' && !entry.notifee) {
      const date = itemEntry.date || itemEntry.date

      if (now.getTime() > date)
        notifications.push({
          name: entry.name,
          id: `${indicator}-${entry?.id}`,
          type: type,
          date,
          overdate: true,
        })

      if (now.getTime() < date)
        notifications.push({
          name: entry.name,
          id: `${indicator}-${entry?.id}`,
          type: type,
          date,
          overdate: false,
        })
    }
    if (entry.category)
      notifications = processNotification(
        entry.entries,
        type,
        indicator,
        notifications,
      )
  }
  return notifications
}
