// Libraries
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import ProgressBar from '../Shared/ProgressBar';

// Utils
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

function CategoryBreakdownItem({
  iconName,
  iconLibrary,
  categoryName,
  amountSpent,
  amountBudgeted,
}) {
  const isBudgeted = amountBudgeted !== null;
  const amountSpentString = convertAmountToCurrencyString({
    amount: amountSpent,
    minimumIntegerDigits: 1,
  });
  let budgetString = '';
  let differenceString = '';
  let difference = 0;
  let didSpendTooMuch = false;
  let percentageSpent = 0;
  if (isBudgeted) {
    // Get the budge formatted string
    budgetString = convertAmountToCurrencyString({
      amount: amountBudgeted,
      minimumIntegerDigits: 1,
    });

    // Determine if we are above or below the budget
    difference = amountBudgeted - amountSpent;
    differenceString = convertAmountToCurrencyString({
      amount: Math.abs(difference),
      minimumIntegerDigits: 1,
    });
    if (difference < 0) {
      didSpendTooMuch = true;
      differenceString += ' over budget';
    } else {
      differenceString += ' under budget';
    }

    // Determine the percentage spent
    percentageSpent = (amountSpent / amountBudgeted) * 100;
  }

  return (
    <View style={styles.contentWrapper}>
      <View style={styles.topRow}>
        <View style={styles.iconView}>
          <MaterialCommunityIcon
            name={iconName}
            size={36}
            color={COLORS.blueBackground}
          />
        </View>
        <View style={styles.mainTextView}>
          <Text style={styles.categoryTitle} numberOfLines={1}>
            {categoryName}
          </Text>
          <Text
            style={[
              styles.categorySubTitle,
              didSpendTooMuch ? styles.overSpend : {},
            ]}>
            {isBudgeted ? differenceString : `${amountSpentString} spent`}
          </Text>
        </View>
      </View>
      {isBudgeted && (
        <ProgressBar
          showLabels={true}
          labelMin={amountSpentString}
          labelMax={budgetString}
          percent={percentageSpent}
        />
      )}
    </View>
  );
}

export default CategoryBreakdownItem;

const styles = StyleSheet.create({
  contentWrapper: {
    marginBottom: 15,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mainTextView: {
    overflow: 'hidden',
    flexShrink: 1,
  },
  categoryTitle: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
  },
  categorySubTitle: {
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.p,
    color: COLORS.grayDark,
  },
  overSpend: {
    color: COLORS.red,
  },
});
