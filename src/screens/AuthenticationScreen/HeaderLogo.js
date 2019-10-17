// Libraries
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// Props
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

function HeaderLogo() {
  return (
    <View style={styles.logoWrapper}>
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        source={require('../../assets/BalanceLogo.png')}
      />
      <Text style={styles.balanceText}>Balance</Text>
      <Text style={styles.balanceSubText}>balance your life</Text>
    </View>
  );
}
export default HeaderLogo;

const styles = StyleSheet.create({
  logoWrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 220,
    height: undefined,
    alignItems: 'center',
    flex: 1,
  },
  balanceText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h4,
    color: COLORS.black,
  },
  balanceSubText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.s1,
    color: COLORS.black,
    opacity: 0.7,
  },
});
