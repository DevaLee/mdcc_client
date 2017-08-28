/**
 * Created by ritamashin on 2017/8/17.
 */
import {combineReducers} from 'redux'
import schedule from './schedule'
import data from './data'

export default combineReducers({
    schedule,
    data
})