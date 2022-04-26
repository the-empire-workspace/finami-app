import {Alert} from 'react-native'
import {processCategoryDeep, verifyId} from 'utils'

export const processConcurrentData = (newFormData: any) => {
  const now = new Date()
  const paymentDate = new Date(newFormData.payment_date)
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  paymentDate.setHours(0)
  paymentDate.setMinutes(0)
  paymentDate.setSeconds(0)
  paymentDate.setMilliseconds(0)
  const diff = now.getTime() - paymentDate.getTime()

  if (diff > 0) {
    Alert.alert('', 'time must be same or major that now')
    return false
  }

  const entries = [
    {
      amount: Number(newFormData.amount),
      status: 'paid',
      name: newFormData.name,
      type: newFormData.type,
      date: newFormData.payment_date,
      currency: newFormData.currency,
    },
  ]

  if (diff < 0) entries[0].status = 'pending'

  newFormData.entries = entries

  return newFormData
}

const setCategoryData = (newFormData: any) => {
  newFormData.category = true
  newFormData.entries = []
  newFormData.date = new Date().getTime()

  return newFormData
}

const paymentUniqueStatus = (newFormData: any) => {
  if (newFormData.paymentType === 'unique') {
    const now = new Date()
    const paymentDate = new Date(newFormData.payment_date)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    paymentDate.setHours(0)
    paymentDate.setMinutes(0)
    paymentDate.setSeconds(0)
    paymentDate.setMilliseconds(0)
    const diff = now.getTime() - paymentDate.getTime()
    if (diff < 0) newFormData.status = 'pending'
    if (diff >= 0) newFormData.status = 'paid'
  }
  return newFormData
}

export const processCreation = (
  newFormData: any,
  IncomingItems: any,
  itemView: any,
  params: any,
) => {
  newFormData.type = params?.type
  newFormData.item = itemView

  if (itemView === false) newFormData = setCategoryData(newFormData)

  if (itemView === true) newFormData.amount = Number(newFormData.amount)

  const categoryIds = params?.categoryId

  newFormData = paymentUniqueStatus(newFormData)
  if (categoryIds?.length)
    newFormData = processCategoryDeep(
      categoryIds,
      IncomingItems,
      params,
      newFormData,
    )

  const newIncoming = verifyId(params, newFormData, IncomingItems)

  return newIncoming
}
