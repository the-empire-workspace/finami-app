import { call } from 'redux-saga/effects'
import axios from 'axios'

function* fetchService(url: any, method: any = 'GET', params: any = undefined, auth: any = null): any {
  const objectRequest: any = {
    method,
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 60000,
  }

  if (auth) objectRequest.headers.Authorization = `Bearer ${auth}`

  const response = yield call(axios, objectRequest)
  const responseBody = response.data

  return responseBody
}

export default fetchService
