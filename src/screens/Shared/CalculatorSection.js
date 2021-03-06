// Libraries
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

// Keyboard config
const KEYBOARD_BUTTONS = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['BACK', 0, 'DONE']];

class CalculatorSection extends Component {
  // Keyboard button press
  handleKeyboardPress = btnText => {
    // dismiss keyboard if it's up - added to the text input, so may not be needed
    //Keyboard.dismiss();

    const { value, onCalculatorChange, onCalculatorDone } = this.props;
    if (btnText === 'DONE') {
      onCalculatorDone();
    } else if (btnText === 'BACK') {
      onCalculatorChange(value.slice(0, -1));
    } else {
      // Ensure that the number isn't too big
      const currentAmountNumber = parseInt(value + btnText, 10);
      if (!isNaN(currentAmountNumber) && currentAmountNumber > 99999999) {
        return;
      }
      onCalculatorChange(value + btnText);
    }
  };

  // Return either number value or icon
  getKeyboardButtonText = btnText => {
    if (btnText === 'DONE') {
      return (
        <Text style={styles.keyboardButtonDone}>
          {getIcon({
            name: 'check',
            size: FONTS.sizes.h3,
            color: COLORS.white,
          })}
        </Text>
      );
    } else if (btnText === 'BACK') {
      return (
        <Text style={styles.keyboardButtonText}>
          {getIcon({
            name: 'backspace',
            size: FONTS.sizes.h4,
          })}
        </Text>
      );
    }
    return <Text style={styles.keyboardButtonText}>{btnText}</Text>;
  };

  // Render the key pad buttons
  _renderKeyboardButtons = () => {
    return KEYBOARD_BUTTONS.map((row, rowIdx) => {
      return (
        <View key={rowIdx} style={styles.keyboardRow}>
          {row.map((button, buttonIdx) => {
            return (
              <TouchableOpacity
                key={buttonIdx}
                style={styles.keyboardButton}
                activeOpacity={0.7}
                onPress={() => this.handleKeyboardPress(button)}>
                {this.getKeyboardButtonText(button)}
              </TouchableOpacity>
            );
          })}
        </View>
      );
    });
  };

  // Render the current amount of expense
  _renderCurrentAmount = () => {
    const { value } = this.props;
    const currentAmountNumber = parseInt(value, 10);
    if (!value || currentAmountNumber === 0) {
      return (
        <Fragment>
          <Text style={styles.currentExpenseTextIntegers}>$00.</Text>
          <Text style={styles.currentExpenseTextDecimals}>00</Text>
        </Fragment>
      );
    }

    // Handle number formatting
    const entireFormattedNumber = convertAmountToCurrencyString({
      amount: currentAmountNumber,
    });
    const formattedNumberArray = entireFormattedNumber.split('.');
    return (
      <Fragment>
        <Text
          style={styles.currentExpenseTextIntegers}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {formattedNumberArray[0]}.
        </Text>
        <Text
          style={styles.currentExpenseTextDecimals}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {formattedNumberArray[1]}
        </Text>
      </Fragment>
    );
  };

  render() {
    return (
      <Fragment>
        <View style={styles.currentExpenseSection}>
          {this._renderCurrentAmount()}
        </View>

        <View style={styles.keyboardWrapper}>
          {this._renderKeyboardButtons()}
        </View>
      </Fragment>
    );
  }
}

export default CalculatorSection;

const styles = StyleSheet.create({
  currentExpenseSection: {
    paddingTop: 20,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
  },
  currentExpenseTextIntegers: {
    ...getFontFamilyStyles('monoMedium'),
    fontSize: FONTS.sizes.b2,
    lineHeight: FONTS.sizes.b2 + 8,
  },
  currentExpenseTextDecimals: {
    ...getFontFamilyStyles('monoMedium'),
    fontSize: FONTS.sizes.h4,
    textDecorationLine: 'underline',
    lineHeight: FONTS.sizes.h4 + 10,
    flexShrink: 0.8,
  },
  keyboardWrapper: {
    flex: 1,
  },
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
  },
  keyboardButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardButtonText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h2,
  },
  keyboardButtonDone: {
    backgroundColor: COLORS.blueMain,
    borderRadius: 10,
    padding: 20,
    overflow: 'hidden',
  },
});
