import { debugLog } from 'utils'
import { call, put, select, takeLatest, SelectEffect, CallEffect, PutEffect } from 'redux-saga/effects'
import { COMPLETE_ONBOARDING, COMPLETE_ONBOARDING_ASYNC } from './action-types'
import { actionObject } from 'utils'
import { signin } from 'store/actions'
import { selectCurrency, selectIntermitence } from 'store/selector'
import { GET_CURRENCIES_ASYNC } from 'store/currency/action-types'
import { useUserService } from '../../services/user/userService'
import { useAccountService } from '../../services/account/accountService'
import { useEntryService } from '../../services/entry/entryService'
import { useCurrencyService } from '../../services/currency/currencyService'
import { User, UserCreateParams } from '../../utils/database/models/User'
import { Account, AccountCreateParams } from '../../utils/database/models/Account'
import { Entry, EntryCreateParams } from '../../utils/database/models/Entry'
import { Currency } from '../../utils/database/models/Currency'

// Types
interface Payload {
  username?: string
  image?: string
  principal_currency?: string
  available_balance?: number
  concept?: string
  [key: string]: any
}

interface Action {
  payload: Payload
  type: string
}

interface CurrencyState {
  currencies: Currency[]
  [key: string]: any
}

interface IntermitenceState {
  prices: any
  [key: string]: any
}

// Helper functions
function* handleError(error: Error, context: string): Generator<never, void, unknown> {
  debugLog(error, `Error in ${context}`)
}

// Service calls
function* createUserService(params: UserCreateParams): Generator<CallEffect<User | null>, User | null, any> {
  const userService = useUserService()
  return yield call(userService.createNewUser, params)
}

function* createAccountService(params: AccountCreateParams): Generator<CallEffect<Account | null>, Account | null, any> {
  const accountService = useAccountService()
  return yield call(accountService.createNewAccount, params)
}

function* createEntryService(params: EntryCreateParams): Generator<CallEffect<Entry | null>, Entry | null, any> {
  const entryService = useEntryService()
  return yield call(entryService.createNewEntry, params)
}

function* getCurrenciesService(): Generator<CallEffect<Currency[]>, Currency[], any> {
  const currencyService = useCurrencyService()
  const currencies = yield call(currencyService.fetchCurrencies)
  return currencies || []
}

// Saga functions
function* completeOnboardingAsync({ payload }: Action): Generator<SelectEffect | CallEffect<any> | PutEffect, void, any> {
  try {
    const { username, image, ...data } = payload

    const user = yield* createUserService({
      username: username || '',
      picture: image || undefined,
      currency_id: Number(data?.principal_currency) || 1,
    })

    if (!user) {
      throw new Error('Failed to create user')
    }

    const account = yield* createAccountService({
      user: user.id,
      account_name: username || 'Main Account',
      account_number: '1',
      account_type: 'personal',
      account_currency: Number(data?.principal_currency) || 1,
      organization: 'personal',
    })

    if (!account) {
      throw new Error('Failed to create account')
    }

    const intermitenceState = (yield select(selectIntermitence)) as unknown as IntermitenceState
    const currencyState = (yield select(selectCurrency)) as unknown as CurrencyState
    const { prices } = intermitenceState
    let { currencies } = currencyState

    if (!currencies?.length) {
      const currencyService = useCurrencyService()
      currencies = yield call([currencyService, currencyService.fetchCurrencies])
      yield put(actionObject(GET_CURRENCIES_ASYNC, currencies))
    }

    if (Number(payload?.available_balance)) {
      yield* createEntryService({
        account_id: account.id,
        category_id: 1, // Default category for initial balance
        payment_type: 'general',
        amount: Number(payload?.available_balance),
        entry_type: 'income',
        payment_concept: payload?.concept || '',
        comment: '',
        emissor: '',
        email: '',
        phone: '',
        status: 'paid',
        date: new Date(),
      })
    }

    yield put(signin())
    yield put(actionObject(COMPLETE_ONBOARDING_ASYNC, payload))
  } catch (error) {
    yield* handleError(error as Error, 'completeOnboardingAsync')
  }
}

// Watchers
export function* watchCompleteOnboarding(): Generator {
  yield takeLatest(COMPLETE_ONBOARDING, completeOnboardingAsync)
}
