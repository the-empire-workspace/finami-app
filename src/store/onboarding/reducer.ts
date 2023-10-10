import {DispatchProps} from 'interfaces'
import {COMPLETE_ONBOARDING_ASYNC, SET_STEP} from './action-types'

const initialState = {
  username: '',
  image: null,
  account_name: '',
  account_comments: '',
  account_number: '',
  bank: '',
  account_type: '',
  account_currency: '',
  available_balance: '',
}

const OnboardingReducer = (
  state = initialState,
  {type, payload}: DispatchProps,
) => {
  switch (type) {
    case SET_STEP:
      return {...state, ...payload}
    case COMPLETE_ONBOARDING_ASYNC:
      return {...state, ...payload}
    default:
      return state
  }
}

export default OnboardingReducer
