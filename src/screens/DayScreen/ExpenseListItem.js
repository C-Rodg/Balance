// Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Utils
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import COLORS from '../../styles/colors';

class ExpenseListItem extends Component {
  // Render the individual action button
  _renderRightAction = (type, icon, color, x, progress, dragX) => {
    const { onDelete, onEdit, expenseId } = this.props;
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      if (type === 'EDIT') {
        onEdit(expenseId);
      } else {
        onDelete(expenseId);
      }
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <MaterialCommunityIcon name={icon} size={32} color={COLORS.white} />
        </RectButton>
      </Animated.View>
    );
  };

  // Render the actions on the right
  _renderRightActions = (progress, dragX) => (
    <View style={{ width: 128, flexDirection: 'row' }}>
      {this._renderRightAction(
        'EDIT',
        'pencil',
        '#feca57',
        128,
        progress,
        dragX,
      )}
      {this._renderRightAction(
        'DELETE',
        'delete-forever',
        '#ee5253',
        64,
        progress,
        dragX,
      )}
    </View>
  );

  // Update the Ref
  updateRef = ref => {
    this._swipeableRow = ref;
  };

  // Close the swipeable row
  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const { categoryIcon, expenseTitle, amount } = this.props;
    const formattedAmount = convertAmountToCurrencyString({
      amount,
      minimumIntegerDigits: 1,
    });
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this._renderRightActions}>
        <RectButton style={styles.rectButton}>
          <MaterialCommunityIcon
            name={categoryIcon}
            size={21}
            color={COLORS.black}
          />
          <Text style={styles.itemName} numberOfLines={1}>
            {expenseTitle}
          </Text>
          <Text style={styles.itemAmount}>{formattedAmount}</Text>
        </RectButton>
      </Swipeable>
    );
  }
}

export default ExpenseListItem;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rectButton: {
    flex: 1,
    height: 60,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
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
