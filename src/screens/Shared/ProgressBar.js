// Libraries
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Styles
import COLORS from '../../styles/colors';
import { getFontFamilyStyles } from '../../styles/fonts';

function ProgressBar({ showLabels, labelMin, labelMax, percent }) {
  const fixedPercent = percent > 100 ? 100 : percent;
  return (
    <View style={styles.progressBar}>
      <View style={styles.barBackground}>
        <View style={[styles.barFilled, { width: `${fixedPercent}%` }]} />
      </View>
      {showLabels && (
        <View style={styles.labelView}>
          <Text style={styles.labelText}>{labelMin}</Text>
          <Text style={styles.labelText}>{labelMax}</Text>
        </View>
      )}
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    marginVertical: 10,
  },
  barBackground: {
    backgroundColor: COLORS.gray,
    borderRadius: 4,
    height: 7,
    width: '100%',
  },
  barFilled: {
    backgroundColor: COLORS.blueLight,
    width: 0,
    height: 7,
    borderRadius: 4,
  },
  labelView: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: COLORS.black,
  },
  labelText: {
    color: COLORS.black,
    ...getFontFamilyStyles('medium'),
  },
});
