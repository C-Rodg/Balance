// Libraries
import React, { Component, createRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

class DaySwiper extends Component {
  longPressRef = createRef();
  panGestureRef = createRef();

  // Navigate to day before
  swipeLeftHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      console.log("I'm flinged left!");
    }
  };
  // Navigate to day after
  swipeRightHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      console.log("I'm flinged right!");
    }
  };

  // Long press handler
  longPressHandler = ({ nativeEvent }) => {
    console.log('long press - state change');
    if (nativeEvent.state === State.ACTIVE) {
      console.log('LONG PRESSS REACHED');
    }
  };

  test1 = ({ nativeEvent }) => {
    console.log('long press - gesture');
  };

  test2 = () => {
    console.log('pan - gesture');
  };

  test3 = () => {
    console.log('pan - state change');
  };

  render() {
    const { currentDay } = this.props;
    return (
      <View style={{ backgroundColor: 'lightblue' }}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={this.swipeRightHandler}>
          <FlingGestureHandler
            direction={Directions.LEFT}
            onHandlerStateChange={this.swipeLeftHandler}>
            <PanGestureHandler
              ref={this.panGestureRef}
              onHandlerStateChange={this.test3}
              onGestureEvent={this.test2}
              waitFor={this.longPressRef}
              simultaneousHandlers={this.longPressRef}>
              <LongPressGestureHandler
                ref={this.longPressRef}
                onHandlerStateChange={this.longPressHandler}
                onGestureEvent={this.test1}
                simultaneousHandlers={this.panGestureRef}>
                <Text style={styles.dayText}>{currentDay}</Text>
              </LongPressGestureHandler>
            </PanGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </View>
    );
  }
}

export default DaySwiper;

const styles = StyleSheet.create({
  dayText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.b4,
    textAlign: 'center',
    lineHeight: FONTS.sizes.b4 + 10,
  },
});
