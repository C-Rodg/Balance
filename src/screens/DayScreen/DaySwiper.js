// Libraries
import React, { Component, createRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

// EVENTS GUIDE:
// Swipe Left: Day - 1
// Swipe Right: Day + 1
// Double Tap: Reset date to today
// Single Tap: Switch to fast date slider
// Single Tap: Switch to normal date flinger

class DaySwiper extends Component {
  doubleTapRef = createRef();

  state = {
    isFastSliderActive: false,
  };

  // Double tap - navigate to today's date
  doubleTapHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      console.log('DOUBLE TAP - reset date');
      // TODO: reset date
    }
  };

  // Navigate to day before
  swipeLeftHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      console.log("I'm flinged left!");
      // TODO: day - 1
    }
  };
  // Navigate to day after
  swipeRightHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      console.log("I'm flinged right!");
      // TODO: day + 1
    }
  };

  // Toggle gesture handlers
  toggleGestureHandlers = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.setState(prevState => {
        return {
          isFastSliderActive: !prevState.isFastSliderActive,
        };
      });
    }
  };

  // Render - fast switch date slider
  _renderFastSlider = () => {
    // TODO: render some kind of slider
    const { currentDay } = this.props;
    return (
      <TapGestureHandler onHandlerStateChange={this.toggleGestureHandlers}>
        <Text style={[styles.dayText, { color: 'blue' }]}>{currentDay}</Text>
      </TapGestureHandler>
    );
  };

  // Render - normal fling date swiper
  _renderSwipeSlider = () => {
    const { currentDay } = this.props;
    return (
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={this.swipeRightHandler}>
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={this.swipeLeftHandler}>
          <TapGestureHandler
            onHandlerStateChange={this.toggleGestureHandlers}
            waitFor={this.doubleTapRef}>
            <TapGestureHandler
              ref={this.doubleTapRef}
              onHandlerStateChange={this.doubleTapHandler}
              numberOfTaps={2}>
              <Text style={[styles.dayText, { color: 'red' }]}>
                {currentDay}
              </Text>
            </TapGestureHandler>
          </TapGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  };

  render() {
    const { isFastSliderActive } = this.state;
    return (
      <View style={{ backgroundColor: 'lightblue' }}>
        {isFastSliderActive
          ? this._renderFastSlider()
          : this._renderSwipeSlider()}
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
