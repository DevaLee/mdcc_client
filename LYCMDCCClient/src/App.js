/**
 * Created by ritamashin on 2017/8/17.
 */
import React, {Component} from 'react';
import reducer from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {persistStore , autoRehydrate} from 'redux-persist'
import {createStore , applyMiddleware} from 'redux'
import {AsyncStorage} from 'react-native'
import apiRequest from './helper/apiRequestMiddleware'
import MainScreen from './pages/MainScreen'

const createStoreWithMiddleWare = applyMiddleware(thunk,apiRequest)(createStore);
const store = autoRehydrate()(createStoreWithMiddleWare)(reducer)
persistStore(store,{storage : AsyncStorage})

import {
    Platform,
    StatusBar,
    View
}from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25);
export const NAV_BAR_HEIGHT =  (Platform.OS === 'ios' ? 44 : 56);
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19;

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar
                        barStyle='light-content'
                        backgroundColor='transparent'
                        style={{height: STATUS_BAR_HEIGHT}}
                        translucent={ABOVE_LOLIPOP}
                    />
                    <Navigator
                        ref="navigator"
                        initialRoute={{component: MainScreen}}
                        configureScene= {(route) => this.configureScene(route)}
                        renderScene={(route, navigator) => {
                            return <route.component navigator={navigator} {...route} {...route.passProps}/>
                        }}
                    />
                </View>
            </Provider>
        )
    }

    configureScene (route) {
        return route.scene || Navigator.SceneConfigs.FloatFromBottom
    }

}