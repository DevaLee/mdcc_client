/**
 * Created by ritamashin on 2017/8/18.
 */
import React , {PropTypes,PureComponent} from 'react'
import TabNavigator from 'react-native-tab-navigator'
import MySchedules from './MySchedules'
import Schedules from './Schedules'
import {Image ,StyleSheet} from 'react-native'
import TabNavigatorItem from "react-native-tab-navigator/TabNavigatorItem";


const SCHEDULE_IMAGES = [
    {
        active : require('../assets/schedule-23-active.png'),
        inactive : require('../assets/schedule-23.png'),
    },
    {
        active : require('../assets/schedule-24-active.png'),
        inactive: require('../assets/schedule-24.png')
    }
];

export default class MainScreen extends PureComponent {
    static propTypes = {
        navigator :PropTypes.object,
        user : PropTypes.object,
    };

    // state = {
    //     selectedTab : 'schedules',
    //     selectedSegment : 0,
    // }


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab : 'schedules',
            selectedSegment : 0
        };
      }


    render(){
        return (
            <TabNavigator>
                <TabNavigatorItem
                    selected={this.state.selectedTab === 'schedules'}
                    title='日程安排'
                    selectedTitleStyle={{color : "#032250"}}
                    renderIcon={() => <Image style={styles.icon}
                                             source={SCHEDULE_IMAGES[this.state.selectedSegment].inactive}/>}
                    renderSelectedIcon={() => <Image style={styles.icon}
                                                     source={SCHEDULE_IMAGES[this.state.selectedSegment].active}/>}
                    onPress={() => this.setState({selectedTab:'schedules'})}
                >
                    <Schedules navigator={this.props.navigator}
                               onSegementSelected={(selectedSegment) => this.onSegmentSelected(selectedSegment) }/>
                </TabNavigatorItem>

                <TabNavigatorItem
                    selected={this.state.selectedTab === 'mySchedules'}
                    title='我的订阅'
                    selectedTitleStyle={{color : "#032250"}}
                    renderIcon={() => <Image style={styles.icon}
                                             source={SCHEDULE_IMAGES[this.state.selectedSegment].inactive}/>}
                    renderSelectedIcon={() => <Image style={styles.icon}
                                                     source={SCHEDULE_IMAGES[this.state.selectedSegment].active}/>}
                    onPress={() => this.setState({selectedTab : 'mySchedules'})}
                >
                    <MySchedules navigator={this.props.navigator} emptyOperation={()=> this.goHome()}/>
                </TabNavigatorItem>
            </TabNavigator>


        )
    }

    onSegmentSelected(selectedSegment){
        alert(selectedSegment);
    }

    goHome(){

    }
}

const styles = StyleSheet.create({
   icon :{
       height : 28,
       width : 28
   }
});