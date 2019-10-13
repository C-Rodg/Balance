// Libraries
import React, { Component, createRef } from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styles
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

class IconTextInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.input = createRef();
    this._onLayout = this._onLayout.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this.focus = this.focus.bind(this);

    this.state = {
      focusedAnim: new Animated.Value(0),
      width: null,
    };
  }
  static defaultProps = {
    iconColor: COLORS.black,
    height: 48,
    inputPadding: 10,
    labelHeight: 28,
    borderHeight: 2,
    animationDuration: 300,
    iconName: 'pencil',
  };

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const isFocused = this.inputRef().isFocused();
      if (!isFocused) {
        const isActive = Boolean(newValue);
        if (isActive !== this.isActive) {
          this._toggle(isActive);
        }
      }
    }
  }

  _onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  }

  _onChange(event) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(event);
    }
  }

  _onBlur(event) {
    if (!this.props.value) {
      this._toggle(false);
    }

    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  }

  _onFocus(event) {
    this._toggle(true);

    const onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus(event);
    }
  }

  _toggle(isActive) {
    const { animationDuration, easing, useNativeDriver } = this.props;
    this.isActive = isActive;
    Animated.timing(this.state.focusedAnim, {
      toValue: isActive ? 1 : 0,
      duration: animationDuration,
      easing,
      useNativeDriver,
    }).start();
  }

  inputRef() {
    return this.input.current;
  }

  focus() {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  render() {
    const {
      iconColor,
      iconName,
      label,
      style: containerStyle,
      height: inputHeight,
      inputPadding,
      labelHeight,
      borderHeight,
      inputStyle,
      labelStyle,
      value,
    } = this.props;
    const { width, focusedAnim } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(
      MaterialCommunityIcon,
    );
    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + inputPadding,
          },
        ]}
        onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, labelHeight + inputPadding],
              }),
            }}>
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 12],
                  }),
                },
              ]}>
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref={this.input}
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
              paddingTop: inputPadding / 2,
            },
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
          clearButtonMode="while-editing"
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableWithoutFeedback onPress={this.focus}>
          <AnimatedIcon
            name={iconName}
            color={iconColor}
            style={{
              position: 'absolute',
              bottom: 0,
              right: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width + inputPadding],
              }),
              transform: [
                {
                  rotate: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-90deg'],
                  }),
                },
              ],
              fontSize: 20,
              backgroundColor: 'transparent',
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 3,
            right: 0,
            height: borderHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: iconColor,
          }}
        />
      </View>
    );
  }
}

export default IconTextInput;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  label: {
    backgroundColor: 'transparent',
    color: '#333333',
    ...getFontFamilyStyles('semiBold'),
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 0,
    color: COLORS.black,
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.p,
  },
});
