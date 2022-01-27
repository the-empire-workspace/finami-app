import { combineReducers } from 'redux'
import account from './account/reducer'
import incoming from './incoming/reducer'
import outcoming from './outcoming/reducer'

const reducers = combineReducers({
  account,
  incoming,
  outcoming,
})

export default reducers
