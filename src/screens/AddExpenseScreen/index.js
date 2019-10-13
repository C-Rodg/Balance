// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import IconTextInput from '../Shared/IconTextInput';

// Utils
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import { overlayCardStyles } from '../../styles/cardStyles';
import {
  topContentSectionStyles,
  topContentSectionTitleStyles,
  topContentSectionSubTitleStyles,
} from '../../styles/layout';

const KEYBOARD_BUTTONS = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['BACK', 0, 'DONE']];

class AddExpenseScreen extends Component {
  state = {
    expenseTitle: '',
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
    // dismiss keyboard if it's up - added to the text input, so may not be needed
    //Keyboard.dismiss();

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
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={styles.contentWrapper}>
          <View style={topContentSectionStyles}>
            <MaterialCommunityIcon
              size={72}
              color={COLORS.white}
              name="headphones"
            />
            <TouchableOpacity style={styles.switchCategoryButtonText}>
              <Text
                style={styles.switchCategoryButtonText}
                onPress={() =>
                  this.props.navigation.navigate('CategorySelect')
                }>
                -select a category-
              </Text>
            </TouchableOpacity>
            <Text style={topContentSectionSubTitleStyles}>
              No budget set...
            </Text>
          </View>
          <View style={[overlayCardStyles, styles.overwriteCardStyles]}>
            <IconTextInput
              value={this.state.expenseTitle}
              label="What's this for?"
              iconName="pencil"
              onChange={ev =>
                this.setState({ expenseTitle: ev.nativeEvent.text })
              }
            />
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
  switchCategoryButtonText: {
    color: COLORS.white,
    textDecorationLine: 'underline',
    ...topContentSectionTitleStyles,
  },
  overwriteCardStyles: {
    paddingTop: 3,
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
});
