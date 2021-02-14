import { combineReducers } from 'redux'
import funcionarioReducer from './funcionario'

const rootReducer = combineReducers({
  funcionarioReducer,
})

export default rootReducer
