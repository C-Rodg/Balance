// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styling
import COLORS from '../styles/colors';
import FONTS, { getFontFamilyStyles } from '../styles/fonts';

const KEYBOARD_BUTTONS = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['BACK', 0, 'DONE']];

class AddExpenseScreen extends Component {
  state = {
    currentAmountString: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Expense',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: (
      <MaterialCommunityIcon
        size={32}
        color={COLORS.black}
        name="arrow-left"
        onPress={() => navigation.goBack(null)}
      />
    ),
  });

  // Keyboard button press
  handleKeyboardPress = btnText => {
    const { currentAmountString } = this.state;
    if (btnText === 'DONE') {
      // TODO: save expense
      this.props.navigation.pop();
    } else if (btnText === 'BACK') {
      this.setState({
        currentAmountString: currentAmountString.slice(0, -1),
      });
    } else {
      // Ensure that the number isn't too big
      const currentAmountNumber = parseInt(currentAmountString + btnText, 10);
      if (!isNaN(currentAmountNumber) && currentAmountNumber > 99999999) {
        return;
      }
      this.setState({
        currentAmountString: currentAmountString + btnText,
      });
    }
  };

  // Return either number value or icon
  getKeyboardButtonText = btnText => {
    if (btnText === 'DONE') {
      return (
        <Text style={styles.keyboardButtonDone}>
          <MaterialCommunityIcon
            name="check"
            size={FONTS.sizes.h3}
            color={COLORS.white}
          />
        </Text>
      );
    } else if (btnText === 'BACK') {
      return (
        <Text style={styles.keyboardButtonText}>
          <MaterialCommunityIcon name="backspace" size={FONTS.sizes.h4} />
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
    const { currentAmountString } = this.state;
    const currentAmountNumber = parseInt(currentAmountString, 10);
    if (!currentAmountString || currentAmountNumber === 0) {
      return (
        <Fragment>
          <Text style={styles.currentExpenseTextIntegers}>$00.</Text>
          <Text style={styles.currentExpenseTextDecimals}>00</Text>
        </Fragment>
      );
    }

    // Handle number formatting
    const formatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumIntegerDigits: 2,
    });
    const calculatedNumber = currentAmountNumber / 100;
    const entireFormattedNumber = formatter.format(calculatedNumber);
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
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={styles.contentWrapper}>
          <View style={styles.categorySection}>
            <MaterialCommunityIcon
              size={72}
              color={COLORS.white}
              name="headphones"
            />
            <TouchableOpacity style={styles.switchCategoryButtonText}>
              <Text style={styles.switchCategoryButtonText}>Concert</Text>
            </TouchableOpacity>
            <Text style={styles.totalBudgetText}>Total Budget is $1,250</Text>
          </View>
          <View style={styles.calculatorSection}>
            <View style={styles.currentExpenseSection}>
              {this._renderCurrentAmount()}
            </View>
            <View style={styles.keyboardWrapper}>
              {this._renderKeyboardButtons()}
            </View>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default AddExpenseScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.blueMain,
  },
  categorySection: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  switchCategoryButtonText: {
    color: COLORS.white,
    textDecorationLine: 'underline',
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h3,
  },
  totalBudgetText: {
    color: COLORS.white,
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.h6,
  },
  calculatorSection: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
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
  currentExpenseSection: {
    paddingTop: 20,
    paddingHorizontal: 15,
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
});
