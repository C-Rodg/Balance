// Libraries
import React, { Component, createRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  FlingGestureHandler,
  TapGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import COLORS from '../../styles/colors';

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
    currentDay: this.props.currentDay,
    currentMonthString: this.props.currentMonthString,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.currentMonthString !== state.currentMonthString) {
      return {
        currentDay: props.currentDay,
        currentMonthString: props.currentMonthString,
      };
    }
    return null;
  }

  // Double tap - navigate to today's date
  doubleTapHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.props.onResetDate();
    }
  };

  // Navigate to day before
  swipeLeftHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.props.onChangeDay(this.props.currentDay - 1);
    }
  };
  // Navigate to day after
  swipeRightHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.props.onChangeDay(this.props.currentDay + 1);
    }
  };

  // Toggle gesture handlers
  toggleGestureHandlers = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.setState(prevState => {
        return {
          isFastSliderActive: !prevState.isFastSliderActive,
          currentDay: this.props.currentDay,
        };
      });
    }
  };

  // Set internal date
  setInternalDay = currentDay => {
    this.setState({
      currentDay,
    });
  };

  // Render - fast switch date slider
  _renderFastSlider = () => {
    const { daysInMonth } = this.props;
    const { currentDay } = this.state;
    return (
      <View>
        <TapGestureHandler onHandlerStateChange={this.toggleGestureHandlers}>
          <Text style={[styles.dayText]}>{currentDay}</Text>
        </TapGestureHandler>
        <Slider
          minimumTrackTintColor={COLORS.blueMain}
          minimumValue={1}
          maximumValue={daysInMonth}
          step={1}
          value={currentDay}
          onValueChange={this.setInternalDay}
          onSlidingComplete={this.props.onChangeDay}
        />
      </View>
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
              <Text style={[styles.dayText]}>{currentDay}</Text>
            </TapGestureHandler>
          </TapGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  };

  render() {
    const { isFastSliderActive } = this.state;
    return (
      <View>
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
