import React, {FC, useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {styles} from './styles'
import AppNavigator from '@routes'
import {processCategoryDeep, setI18nConfig, verifyId} from '@utils'
import {useSelector, useDispatch} from 'react-redux'
import {
  /*
  getCurrencyPrice,
  scheduleNotification, */
  setIncoming,
  setOutcoming,
  signin,
} from 'store/actions' /*
import notifee, {EventType} from '@notifee/react-native'
import {emitter} from 'utils/eventEmitter' */
import {ModalStatus} from './elements'

const Main: FC = () => {
  const {user, isAuth} = useSelector((state: any) => state.account)
  const dispatch = useDispatch()

  const [elementData, setElementData] = useState<any>({
    element: null,
    ids: [],
    elements: [],
    type: null,
  })

  const changeStatus = () => {
    const {ids, element, elements, type} = elementData

    let items = []
    if (element.paymentType === 'concurrent') {
      const oldElement = element?.entries[element?.entries?.length - 1]
      const elementDate = new Date(oldElement.date)
      switch (element?.frequency) {
        case 'weeks':
          const weeks = element?.amount_frequency * 604800000
          const time = elementDate.getTime() + weeks
          elementDate.setTime(time)
          break
        case 'months':
          elementDate.setMonth(
            elementDate.getMonth() + element?.amount_frequency,
          )
          break
        case 'days':
          const days = element?.amount_frequency * 86400000
          const timeDays = elementDate.getTime() + days
          elementDate.setTime(timeDays)
          break
        default:
          break
      }
      element.entries[element?.entries?.length - 1] = {
        ...oldElement,
        status: 'paid',
      }
      element?.entries?.push({
        ...oldElement,
        date: elementDate.getTime(),
        status: 'pending',
      })

      if (ids?.length > 1) {
        ids.pop()
        items = processCategoryDeep(
          ids,
          elements,
          {item: element},
          {...element},
        )
      } else items = verifyId({item: element}, {...element}, elements)
    } else if (ids?.length > 1) {
      ids.pop()
      items = processCategoryDeep(
        ids,
        elements,
        {item: element},
        {...element, status: 'paid'},
      )
    } else
      items = verifyId({item: element}, {...element, status: 'paid'}, elements)

    if (items?.length)
      if (type === 'in') dispatch(setIncoming(items))
      else dispatch(setOutcoming(items))

    setElementData({element: null, ids: [], elements: [], type: null})
  }
  /*
  const checkInformation = (data: string) => {
    const dataArray = data.split('-')
    const type = dataArray.shift()
    const elements = type === 'in' ? incomings : outcomings
    let element = null

    for (let i = 0; i < dataArray?.length; i++) {
      const id = Number(dataArray[i])
      if (i === 0) {
        element = elements?.find((el: any) => el.id === id)
        continue
      }
      element = element?.entries?.find((el: any) => el.id === id)
    }

    setElementData({element, ids: dataArray, elements, type})
  } */

  const close = () => {
    setElementData({element: null, ids: [], elements: [], type: null})
  }
  /*
    useEffect(() => {
      dispatch(scheduleNotification())
      emitter.addListener('check_notification', checkInformation)

      notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
          case EventType.PRESS:
            checkInformation(detail?.notification?.id || '')
            break
        }
      })
    }, []) */

  useEffect(() => {
    if (!isAuth) dispatch(signin())
    console.log(isAuth, user)
    if (isAuth) setI18nConfig(user?.language)
  }, [isAuth, user])

  return (
    <SafeAreaView style={[styles.root]}>
      <AppNavigator />
      <ModalStatus
        elementData={elementData}
        onAccept={changeStatus}
        onClose={close}
      />
    </SafeAreaView>
  )
}

export default Main
