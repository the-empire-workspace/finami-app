import {debugLog} from 'utils'
import {call, put, select, takeLatest, SelectEffect, CallEffect, PutEffect} from 'redux-saga/effects'
import {actionObject, getExchangeValues} from 'utils'
import {selectAccount, selectCurrency} from '../selector'
import {
  GET_CURRENCIES,
  GET_CURRENCIES_ASYNC,
  GET_CURRENCY_PRICE,
  GET_CURRENCY_PRICE_ASYNC,
} from './action-types'
import {Currency} from 'utils/database/models'
import {useCurrencyService} from 'services'

// Types
interface CurrencyState {
  currencies: Currency[]
  defaultPrices: {
    date?: number
    id?: number
    [key: string]: any
  }
}

interface AccountState {
  user: {
    currency_id?: number
    [key: string]: any
  }
}

interface ExchangePrices {
  [key: string]: number
}

// Helper functions
function* handleError(error: Error, context: string): Generator<never, void, unknown> {
  debugLog(error, `Error in ${context}`)
}

// Service calls
function* fetchCurrencies(): Generator<CallEffect<Currency[]>, Currency[], Currency[]> {
  const currencyService = useCurrencyService()
  return yield call([currencyService, currencyService.fetchCurrencies])
}

// Saga functions
function* getCurrenciesAsync(): Generator<CallEffect<Currency[]> | PutEffect, void, Currency[]> {
  try {
    const currencies = yield* fetchCurrencies()
    yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
  } catch (error) {
    yield* handleError(error as Error, 'getCurrenciesAsync')
  }
}

function* getDefaultPriceAsync(): Generator<
  SelectEffect | CallEffect<Currency[]> | CallEffect<ExchangePrices> | PutEffect,
  void,
  void
> {
  try {
    const accountState = (yield select(selectAccount)) as unknown as AccountState
    const currencyState = (yield select(selectCurrency)) as unknown as CurrencyState
    const {user} = accountState
    let {currencies, defaultPrices} = currencyState

    if (!currencies?.length) {
      const currencyService = useCurrencyService()
      const newCurrencies = ((yield call([currencyService, currencyService.fetchCurrencies])) as unknown) as Currency[]
      currencies = newCurrencies
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies || []))
    }

    const date = new Date()
    date.setHours(0, 0, 0, 0)
    if (
      !defaultPrices?.date ||
      defaultPrices?.date !== date.getTime() ||
      user?.currency_id !== defaultPrices?.id
    ) {
      const prices = (yield call(getExchangeValues, currencies, user?.currency_id)) as unknown as ExchangePrices
      if (prices && typeof prices === 'object') {
        yield put(
          actionObject(GET_CURRENCY_PRICE_ASYNC, {
            ...prices,
            date: date.getTime(),
            id: user?.currency_id,
          }),
        )
      }
    }
  } catch (error) {
    yield* handleError(error as Error, 'getDefaultPriceAsync')
  }
}

// Watchers
export function* watchGetCurrencies(): Generator {
  yield takeLatest(GET_CURRENCIES, getCurrenciesAsync)
}

export function* watchGetDefaultPrice(): Generator {
  yield takeLatest(GET_CURRENCY_PRICE, getDefaultPriceAsync)
}
