import { combineReducers } from 'redux'
import account from './account/reducer'
import incoming from './incoming/reducer'
import outcoming from './outcoming/reducer'
import currency from './currency/reducer'
import onboarding from './onboarding/reducer'
import intermitence from './intermitence/reducer'
const reducers = combineReducers({
  account,
  incoming,
  outcoming,
  currency,
  onboarding,
  intermitence
})

export default reducers
