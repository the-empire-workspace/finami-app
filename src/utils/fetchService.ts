import {call} from 'redux-saga/effects'
import axios from 'axios'

async function fetchService(
  url: any,
  method: any = 'GET',
  params: any = undefined,
  auth: any = null,
): Promise<any> {
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

  const response = await axios(objectRequest)
  const responseBody = response.data

  return responseBody
}

export default fetchService
