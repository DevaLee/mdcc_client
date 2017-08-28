/**
 * Created by ritamashin on 2017/8/18.
 */
import React , {Component} from 'react'
import {View ,Text} from 'react-native'


export default class MySchedules extends Component{
    static propTypes = {
        navigator : React.PropTypes.object,
        emptyOperation : React.PropTypes.func,
    }


    render() {
        return (
           <View style={{backgroundColor : 'red'}}>
               <Text> 我的订阅</Text>
           </View>
        )


    }
}