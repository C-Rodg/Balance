// Libraries
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

// Styles
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

function BlockButton({ title, onButtonPress }) {
  return (
    <TouchableOpacity
      onPress={onButtonPress}
      style={styles.buttonTouch}
      activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
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
