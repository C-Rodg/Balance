// Libraries
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

// Styles
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

function SecondaryButton({ title, onButtonPress }) {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      style={styles.buttonTouch}
      activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonTouch: {
    backgroundColor: COLORS.blueLight2,
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  buttonText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.p,
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
