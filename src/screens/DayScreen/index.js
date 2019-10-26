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

// HOCs
import withFirebase from '../../hocs/withFirebase';

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
  // Functionality - go to the previous or next month
  goToMonth = next => {
    console.log('NEXT MONTH');
    // TODO: navigate to next month or previous
  };

  // Functionality - delete an expense
  handleDeleteExpense = expenseId => {
    console.log('DELETE');
    console.log(expenseId);
    // TODO: delete expense item
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
    const currentDate = '2019-10-24';
    const { expenses } = this.props;

    // if no items, render empty text
    if (!expenses[currentDate] || expenses[currentDate].length === 0) {
      return '$00.00';
    }

    let sum = 0;
    expenses[currentDate].forEach(expense => (sum += expense.amount));

    return convertAmountToCurrencyString({
      amount: sum,
    });
  };

  // Render - expenses list
  _renderExpensesList = () => {
    const currentDate = '2019-10-24';
    const { expenses, categories } = this.props;
    // if no items, render empty text
    if (!expenses[currentDate] || expenses[currentDate].length === 0) {
      return (
        <View style={cardScrollViewSwipeableStyles}>
          <Text style={styles.noFoundExpenses}>Nothing yet...</Text>
        </View>
      );
    }

    return (
      <ScrollView style={cardScrollViewSwipeableStyles}>
        {expenses[currentDate].map(item => {
          const mappedCategory = categories[item.categoryId] || {
            iconLibrary: 'MaterialCommunityIcon',
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
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <SafeAreaView />
        <View style={offWhiteWrapperStyles}>
          <View style={styles.dateSection}>
            <Text style={styles.yearText}>2020</Text>
            <View style={styles.monthSection}>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={() => this.goToMonth(false)}>
                {getIcon({
                  size: 38,
                  name: 'chevron-left',
                })}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Month')}>
                <Text style={styles.monthText}>September</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={() => this.goToMonth(true)}>
                {getIcon({
                  size: 38,
                  name: 'chevron-right',
                })}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.dayText}>29</Text>
            </View>
            <TouchableOpacity
              style={styles.addExpenseButton}
              onPress={() => this.props.navigation.navigate('Expense')}>
              <Image
                style={styles.addExpenseButtonImage}
                resizeMode="contain"
                source={require('../../assets/AddExpenseLogo.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={overlayCardStyles}>
            <Text style={[overlayCardTitleStyles, styles.cardPadSides]}>
              Today's Expenses:
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
const DayScreenWithFirebase = withFirebase(DayScreen);
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
