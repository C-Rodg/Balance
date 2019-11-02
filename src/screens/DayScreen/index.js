// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

// Components
import ExpenseListItem from './ExpenseListItem';
import DaySwiper from './DaySwiper';

// HOCs
import withFirebase from '../../hocs/withFirebase';
import withDate from '../../hocs/withDate';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import COLORS from '../../styles/colors';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
  simpleMessageStyles,
  cardScrollViewSwipeableStyles,
} from '../../styles/cardStyles';
import { offWhiteWrapperStyles } from '../../styles/layout';

class DayScreen extends Component {
  // Functionality - delete an expense
  handleDeleteExpense = async expenseId => {
    const { firebase } = this.props;
    try {
      await firebase.deleteExpenseItem(expenseId);
    } catch (err) {
      console.log('ERROR DELETING');
      console.log(err.message);
    }
  };

  // Functionality - edit an expense
  handleEditExpense = expenseId => {
    console.log('EDIT');
    console.log(expenseId);
    // TODO: edit expense item
    this.props.navigation.navigate('Expense');
  };

  // Render - expenses total
  _renderExpensesTotal = () => {
    const { expenses, currentDateKey } = this.props;

    // if no items, render empty text
    if (!expenses[currentDateKey] || expenses[currentDateKey].length === 0) {
      return '$00.00';
    }

    let sum = 0;
    expenses[currentDateKey].forEach(expense => (sum += expense.amount));

    return convertAmountToCurrencyString({
      amount: sum,
    });
  };

  // Render - expenses list
  _renderExpensesList = () => {
    console.log('RE RENDER EXPENSE LIST');
    const { expenses, categories, currentDateKey } = this.props;
    console.log(currentDateKey);
    console.log(expenses[currentDateKey]);
    // if no items, render empty text
    if (!expenses[currentDateKey] || expenses[currentDateKey].length === 0) {
      return (
        <View style={cardScrollViewSwipeableStyles}>
          <Text style={styles.noFoundExpenses}>Nothing yet...</Text>
        </View>
      );
    }

    return (
      <ScrollView style={cardScrollViewSwipeableStyles}>
        {expenses[currentDateKey].map(item => {
          const mappedCategory = categories[item.categoryId] || {
            iconLibrary: 'MaterialCommunityIcons',
            iconName: 'help-circle-outline',
          };
          return (
            <ExpenseListItem
              key={item.id}
              {...item}
              category={mappedCategory}
              onDelete={this.handleDeleteExpense}
              onEdit={this.handleEditExpense}
            />
          );
        })}
      </ScrollView>
    );
  };

  render() {
    const {
      currentDateKey,
      currentYear,
      currentMonthString,
      currentDay,
      onChangeMonth,
      daysInMonth,
      onChangeDay,
      onResetDate,
    } = this.props;

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <SafeAreaView />
        <View style={offWhiteWrapperStyles}>
          <View style={styles.dateSection}>
            <Text style={styles.yearText}>{currentYear}</Text>
            <View style={styles.monthSection}>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={() => onChangeMonth(false)}>
                {getIcon({
                  size: 38,
                  name: 'chevron-left',
                })}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Month')}>
                <Text style={styles.monthText}>{currentMonthString}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={() => onChangeMonth(true)}>
                {getIcon({
                  size: 38,
                  name: 'chevron-right',
                })}
              </TouchableOpacity>
            </View>
            <DaySwiper
              currentDay={currentDay}
              daysInMonth={daysInMonth}
              onChangeDay={onChangeDay}
              onResetDate={onResetDate}
              currentMonthString={currentMonthString}
            />

            <TouchableOpacity
              style={styles.addExpenseButton}
              onPress={() =>
                this.props.navigation.navigate('Expense', { currentDateKey })
              }>
              <Image
                style={styles.addExpenseButtonImage}
                resizeMode="contain"
                source={require('../../assets/AddExpenseLogo.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={overlayCardStyles}>
            <Text style={[overlayCardTitleStyles, styles.cardPadSides]}>
              Expenses:
            </Text>
            {this._renderExpensesList()}
            <View style={styles.expensesTotalSection}>
              <Text style={[overlayCardTitleStyles, styles.cardPadSides]}>
                Total:
              </Text>
              <Text style={styles.expensesTotal}>
                {this._renderExpensesTotal()}
              </Text>
            </View>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

// Apply navigation options
const DayScreenWithFirebase = withFirebase(withDate(DayScreen));
DayScreenWithFirebase.navigationOptions = ({ navigation }) => ({
  title: 'Balance',
  headerLeftContainerStyle: {
    paddingLeft: 10,
  },
  headerLeft: getIcon({
    name: 'settings-outline',
    size: 32,
    onPress: () => navigation.navigate('Settings'),
  }),
  headerRightContainerStyle: {
    paddingRight: 10,
  },
  headerRight: getIcon({
    name: 'calendar-text-outline',
    size: 32,
    onPress: () => navigation.navigate('BudgetsList'),
  }),
});

export default DayScreenWithFirebase;

const styles = StyleSheet.create({
  dateSection: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  yearText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    color: COLORS.grayDark,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: FONTS.sizes.h6,
  },
  monthSection: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h3,
    color: COLORS.black,
    textDecorationLine: 'underline',
    lineHeight: FONTS.sizes.h3 + 5,
  },
  monthArrow: {
    paddingHorizontal: 10,
  },
  dayText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.b4,
    textAlign: 'center',
    lineHeight: FONTS.sizes.b4 + 10,
  },
  addExpenseButton: {
    flex: 1,
    flexShrink: 0,
  },
  addExpenseButtonImage: {
    flex: 1,
    height: undefined,
    width: undefined,
    minHeight: 120,
  },
  cardPadSides: {
    paddingHorizontal: 15,
  },
  noFoundExpenses: {
    ...simpleMessageStyles,
    paddingHorizontal: 15,
  },
  expensesTotal: {
    ...getFontFamilyStyles('monoMedium'),
    fontSize: FONTS.sizes.h6,
    paddingRight: 15,
  },
  expensesTotalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
