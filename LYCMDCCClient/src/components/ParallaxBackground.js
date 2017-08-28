/**
 * Created by ritamashin on 2017/8/25.
 */
'use strict'

var Animated = require('Animated');
var resolveAssetSource = require('resolveAssetSource');
var React = require('React');
var StyleSheet = require('StyleSheet');
var View = require('View');
var Image = require('Image');
var Dimensions = require('Dimensions');
import { Text} from 'react-native';
const HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
    maxHeight : number;
    minHeight : number;
    offset : Animated.Value;
    backgroundImage : number;
    backgroundShift : number;
    backgroundColor : string;
    children? : any;
}

type State = {
    shift : Animated.Value;
}

class ParallaxBackground extends React.Component {
    props : Props;
    state : State;

    static HEIGHT = HEIGHT;
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            shift : new Animated.Value(props.backgroundShift || 0)
        };
      }


    componentDidUpdate(prevProps : Props) {
        if (prevProps.backgroundShift !== this.props.backgroundShift){
            Animated.timing(this.state.shift, {
                toValue : this.props.backgroundShift,
                duration : 3000,
            }).start();
        }
    }

    render() : ReactElement {
          const {minHeight , maxHeight , offset , backgroundColor} = this.props;
          const buffer = 10;
          const height = offset.interpolate({
              inputRange : [0, maxHeight - minHeight],
              outputRange : [maxHeight + buffer , minHeight + buffer],
              extrapolateRight : 'clamp',
          });

          return (
              <Animated.View style={[styles.container, {height ,backgroundColor}]}>
                 {this.renderBackgroundImage()}
                  {this.renderContent()}
              </Animated.View>
          )
    }

    renderBackgroundImage(): ?ReactElement {
        const {backgroundImage, minHeight, maxHeight, offset} = this.props;
        if (!backgroundImage) {
            return null;
        }
        const source = resolveAssetSource(backgroundImage);
        if (!source) {
            alert('none source');
            return null;
        }
        const {width} = source;
        const translateX = this.state.shift.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SCREEN_WIDTH - width],
            extrapolate: 'clamp',
        })
        const length = maxHeight - minHeight;
        const translateY = offset.interpolate({
            inputRange: [0, length / 2, length],
            outputRange: [0, -length / 2, -length / 1.5],
            extrapolate: 'clamp',
        })

        const innitialScale = Math.max(SCREEN_WIDTH / width * 2 - 1, 1);
        const scale = offset.interpolate({
            inputRange: [-length, 0],
            outputRange: [2, innitialScale],
            extrapolate: 'clamp',
        })
        const transform = {transform: [{translateX}, {translateY}, {scale}]};
        return (
            <Animated.Image
                source={backgroundImage}
                style={transform}
            />
        );
    }

    renderContent(): ?ReactElement{
        if (React.Children.count(this.props.children) === 0){
            return null;
        }
        const  content = React.Children.only(this.props.children);
        const {minHeight, maxHeight, offset} = this.props;
        const length = maxHeight - minHeight;
        const opacity = offset.interpolate({
            inputRange: [0, length - 40],
            outputRange : [1, 0],
            extrapolate : 'clamp',
        });
        const translateY = offset.interpolate({
            inputRange: [0, length],
            outputRange: [-32, -(length / 2) - 32],
            extrapolate: 'clamp',
        });
        const transforms = { opacity, transform: [{translateY}] };
        return (
            <Animated.View style={[styles.contentContainer, transforms]}>
                {content}
            </Animated.View>
        );
    }
}

const Header_Height = HEIGHT + 156;

const styles = StyleSheet.create({
    container :{
        position : 'absolute',
        left : 0,
        right : 0,
        top: 0,
        overflow : 'hidden'
    },
    contentContainer:{
        position: 'absolute',
        left: 0,
        top:0,
        right:0,
        height : Header_Height,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'transparent'
    }
});
module.exports = ParallaxBackground;

