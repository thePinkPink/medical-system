import { combineReducers } from 'redux'
import patient from './patient';
import admin from './admin';
import doctor from './doctor';

const appStore = combineReducers({
  patient,
  admin,
  doctor
})

export default appStore