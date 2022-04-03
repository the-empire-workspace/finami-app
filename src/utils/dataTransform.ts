import { numberOfWeeks } from './date'

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

export const processEntries = (array: any = [], prevCurrent = null) => {
  const reduceArray = array
  const date = new Date()
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const totals = reduceArray.reduce(
    (prev: any, next: any, index: any) => {
      if (prevCurrent && index === 0) prev = prevCurrent

      if (next.paymentType === 'unique') {
        if (next.status === 'pending') prev.pending += next.amount
        if (next.status === 'paid') prev.total += next.amount

        if (
          next.payment_date > firstDay.getTime() &&
          next.payment_date < lastDay.getTime()
        )
          prev.monthly += next.amount
      }

      if (next.paymentType === 'concurrent') {
        if (next.frequency === 'months')
          prev.monthly += next.amount / Number(next.amount_frequency)
        if (next.frequency === 'weeks') {
          const weeks = numberOfWeeks(firstDay, lastDay)
          const weeksDifference = weeks / Number(next.amount_frequency)
          prev.monthly += next.amount * weeksDifference
        }
        for (const entry of next.entries) {
          if (entry.status === 'pending') prev.pending += entry.amount
          if (entry.status === 'paid') prev.total += entry.amount
        }
      }

      if (next.category) prev = processEntries(next.entries, prev)

      return prev
    },
    { monthly: 0, total: 0, pending: 0 },
  )
  return totals
}
