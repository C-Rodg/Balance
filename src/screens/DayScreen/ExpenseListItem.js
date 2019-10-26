// Libraries
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Components
import SwipeableRow from '../Shared/SwipeableRow';

// Utils
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import COLORS from '../../styles/colors';

function ExpenseListItem({
  category,
  expenseTitle,
  amount,
  id,
  onEdit,
  onDelete,
}) {
  const formattedAmount = convertAmountToCurrencyString({
    amount,
    minimumIntegerDigits: 1,
  });
  return (
    <SwipeableRow rowId={id} onEdit={onEdit} onDelete={onDelete}>
      {getIcon({
        name: category.iconName,
        library: category.iconLibrary,
        size: 21,
        color: COLORS.black,
      })}
      <Text style={styles.itemName} numberOfLines={1}>
        {expenseTitle}
      </Text>
      <Text style={styles.itemAmount}>{formattedAmount}</Text>
    </SwipeableRow>
  );
}

export default ExpenseListItem;

const styles = StyleSheet.create({
  itemName: {
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.p,
    flexShrink: 1,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 10,
    overflow: 'hidden',
  },
  itemAmount: {
    ...getFontFamilyStyles('monoRegular'),
    fontSize: FONTS.sizes.p,
    flexShrink: 0,
    paddingRight: 10,
  },
});
