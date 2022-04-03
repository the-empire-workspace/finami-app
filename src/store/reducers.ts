import { combineReducers } from 'redux'
import account from './account/reducer'
import incoming from './incoming/reducer'
import outcoming from './outcoming/reducer'
import currency from './currency/reducer'

const reducers = combineReducers({
  account,
  incoming,
  outcoming,
  currency,
})

export default reducers
