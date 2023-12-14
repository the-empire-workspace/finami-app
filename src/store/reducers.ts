import {combineReducers} from 'redux'
import account from './account/reducer'
import incoming from './incoming/reducer'
import outcoming from './outcoming/reducer'
import currency from './currency/reducer'
import onboarding from './onboarding/reducer'
import intermitence from './intermitence/reducer'
import goals from './goals/reducer'

const reducers = combineReducers({
  account,
  incoming,
  outcoming,
  currency,
  onboarding,
  intermitence,
  goals,
})

export default reducers
