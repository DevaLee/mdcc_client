/**
 * Created by ritamashin on 2017/8/17.
 */
import {genData} from './dataHelper'
export default store => next => action => {
    const {promise , types , ...rest} = action
    if (!promise){
        return next(action)
    }

    const [REQUEST, SUCCESS, FAIL] = types
    next({...rest, type : REQUEST})

    return promise.then(response => response.json())
        .then(responseData => {
            next({
                ...rest,
                type: SUCCESS,
                updateTime : responseData.data.last_update,
                days :genData({
                    data :responseData.data.list,
                    ok : responseData.ok
                })
            })
        })
        .catch(error => next({
            ...rest,
            type: FAIL,
            error
        }))

}