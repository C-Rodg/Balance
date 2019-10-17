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

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import COLORS from '../../styles/colors';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
  simpleMessageStyles,
  cardScrollViewStyles,
} from '../../styles/cardStyles';
import { offWhiteWrapperStyles } from '../../styles/layout';

class DayScreen extends Component {
  // Setup navigation bar
  static navigationOptions = ({ navigation }) => ({
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

  // Render - expenses list
  _renderExpensesList = () => {
    const todaysExpenses = [
      {
        expenseId: 1,
        categoryIcon: 'cart',
        categoryName: 'Groceries',
        expenseTitle: 'Ralphs',
        amount: 3243,
      },
      {
        expenseId: 2,
        categoryIcon: 'food-fork-drink',
        categoryName: 'Snacks',
        expenseTitle: 'Seven Eleven',
        amount: 178,
      },
      {
        expenseId: 3,
        categoryIcon: 'silverware-fork-knife',
        categoryName: 'Restaurant',
        expenseTitle: 'Fogo De Chao Restaurant',
        amount: 7249,
      },
      {
        expenseId: 5,
        categoryIcon: 'check',
        categoryName: 'Electronics',
        expenseTitle: 'Whatever this is a super long name',
        amount: 12812983,
      },
      {
        expenseId: 4,
        categoryIcon: 'cellphone-link',
        categoryName: 'Electronics',
        expenseTitle: 'Apple',
        amount: 59962,
      },
    ];
    // if no items, render text
    if (todaysExpenses.length === 0) {
      return (
        <View style={styles.scrollViewExpenses}>
          <Text style={styles.noFoundExpenses}>Nothing yet...</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollViewExpenses}>
        {todaysExpenses.map(item => (
          <ExpenseListItem
            key={item.expenseId}
            {...item}
            onDelete={this.handleDeleteExpense}
            onEdit={this.handleEditExpense}
          />
        ))}
      </ScrollView>
    );
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
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
              <Text style={styles.expensesTotal}>$2,243.89</Text>
            </View>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default DayScreen;

const styles = StyleSheet.create({
  dateSection: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  yearText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    color: COLORS.grayDark,
    textAlign: 'center',
    letterSpacing: 1,
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
  },
  addExpenseButton: {
    flex: 1,
    flexShrink: 1,
  },
  addExpenseButtonImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  cardPadSides: {
    paddingHorizontal: 15,
  },
  noFoundExpenses: {
    ...simpleMessageStyles,
    paddingHorizontal: 15,
  },
  scrollViewExpenses: {
    ...cardScrollViewStyles,
    paddingRight: 0,
    paddingLeft: 2,
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
