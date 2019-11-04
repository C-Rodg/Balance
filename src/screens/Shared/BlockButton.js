// Libraries
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

// Styles
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

function BlockButton({
  title,
  onButtonPress,
  buttonStyles = {},
  textStyles = {},
}) {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      style={[styles.buttonTouch, buttonStyles]}
      activeOpacity={0.8}>
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default BlockButton;

const styles = StyleSheet.create({
  buttonTouch: {
    backgroundColor: COLORS.blueMain,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 17,
  },
  buttonText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h5,
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
