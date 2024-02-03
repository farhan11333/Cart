// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import calendar from "../views/apps/calendar/store"
import cart from "./appCart"
const rootReducer = {
  auth,
  navbar,
  layout,
  calendar,
  cart
}

export default rootReducer
