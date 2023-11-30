import {call, put, takeLatest} from 'redux-saga/effects'
import {GET_INCOMING_ASYNC, SET_INCOMING_ASYNC} from './action-types'
import {actionObject, createEntryQuery, getEntriesQuery} from 'utils'

export function* getIncomingAsync(): any {
  try {
    const entries = yield call(getEntriesQuery)
    yield put(actionObject(GET_INCOMING_ASYNC, entries || []))
  } catch (error) {
    console.log(error)
  }
}

export function* setIncomingAsync({payload}: any): any {
  try {
    const entry = Number(payload?.amount)
      ? yield call(createEntryQuery, {
          account: payload?.account,
          payment_type: 'general',
          amount: payload?.amount,
          entry_type: payload?.entry_type,
          staus: payload?.status,
          payment_concept: payload?.payment_concept,
          comment: payload?.comment || '',
          emissor: payload?.emissor || '',
          email: payload?.email || '',
          phone: payload?.phone || '',
          frecuency_type: payload?.frecuency_type,
          frecuency_time: payload?.frecuency_time,
          date: Date.now(),
        })
      : null
    console.log({entry, payload})
    if (entry !== null) yield put(actionObject(SET_INCOMING_ASYNC, entry))
  } catch (error) {
    console.log(error)
  }
}

export function* watchSetIncoming() {
  yield takeLatest(SET_INCOMING_ASYNC, setIncomingAsync)
}
export function* watchGetIncoming() {
  yield takeLatest(GET_INCOMING_ASYNC, getIncomingAsync)
}
