// Libraries
import React, { Component, createRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
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
// Swipe Left: Day + 1
// Swipe Right: Day - 1
// Double Tap: Reset date to today
// Single Tap: Switch to fast date slider
// Single Tap: Switch to normal date flinger

class DaySwiper extends Component {
  doubleTapRef = createRef();
  animatedValue = new Animated.Value(1);

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
      this.props.onChangeDay(this.props.currentDay + 1);
    }
  };
  // Navigate to day after
  swipeRightHandler = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      this.props.onChangeDay(this.props.currentDay - 1);
    }
  };

  // Toggle gesture handlers
  toggleGestureHandlers = ({ nativeEvent }, showFastSlider) => {
    if (nativeEvent.state === State.ACTIVE) {
      if (showFastSlider) {
        this.setState(
          {
            isFastSliderActive: showFastSlider,
            currentDay: this.props.currentDay,
          },
          () => {
            this.animatedValue.setValue(1);
            Animated.spring(this.animatedValue, {
              toValue: 0.7,
              friction: 5,
              tension: 55,
            }).start();
          },
        );
      } else {
        this.setState({
          isFastSliderActive: showFastSlider,
          currentDay: this.props.currentDay,
        });
        Animated.spring(this.animatedValue, {
          toValue: 1,
          friction: 5,
          tension: 70,
        }).start();
      }
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
        <TapGestureHandler
          onHandlerStateChange={ev => this.toggleGestureHandlers(ev, false)}>
          <Animated.Text
            style={[
              styles.dayText,
              { transform: [{ scale: this.animatedValue }] },
            ]}>
            {currentDay}
          </Animated.Text>
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
            onHandlerStateChange={ev => this.toggleGestureHandlers(ev, true)}
            waitFor={this.doubleTapRef}>
            <TapGestureHandler
              ref={this.doubleTapRef}
              onHandlerStateChange={this.doubleTapHandler}
              numberOfTaps={2}>
              <Animated.Text
                style={[
                  styles.dayText,
                  { transform: [{ scale: this.animatedValue }] },
                ]}>
                {currentDay}
              </Animated.Text>
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
