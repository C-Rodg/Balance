// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Components
import CategoryBreakdownItem from './CategoryBreakdownItem';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import COLORS from '../../styles/colors';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
  simpleMessageStyles,
  cardScrollViewStyles,
} from '../../styles/cardStyles';
import {
  topContentSectionStyles,
  topContentSectionTitleStyles,
  topContentSectionSubTitleStyles,
  blueWrapperStyles,
} from '../../styles/layout';

class MonthScreen extends Component {
  // Render - get the monthly expense total
  _renderMonthlyExpensesTotal = () => {
    const { expenses, navigation } = this.props;
    const currentDateKey = navigation.getParam('currentDateKey', '');

    if (!currentDateKey) {
      return '$00.00';
    }

    const dateKeyArray = currentDateKey.split('-');

    const objectKeyPrefix = `${dateKeyArray[0]}-${dateKeyArray[1]}-`;

    let sum = 0;
    // Loop through the possible days in the month and sum the expenses
    for (let i = 1; i < 32; i++) {
      const dayKey = `${objectKeyPrefix}${String(i).padStart(2, '0')}`;

      if (expenses[dayKey] && Array.isArray(expenses[dayKey])) {
        expenses[dayKey].forEach(expense => (sum += expense.amount));
      }
    }

    return convertAmountToCurrencyString({
      amount: sum,
      minimumIntegerDigits: 1,
    });
  };

  // Render the category breakdown
  _renderCategoryBreakdown = () => {
    const { expenses, categories, budgets, navigation } = this.props;
    const currentDateKey = navigation.getParam('currentDateKey', '');

    if (!currentDateKey) {
      return <Text style={simpleMessageStyles}>Nothing found...</Text>;
    }

    // Loop through the days
    const categorySpendingMap = {};
    const dateKeyArray = currentDateKey.split('-');
    const objectKeyPrefix = `${dateKeyArray[0]}-${dateKeyArray[1]}-`;
    for (let i = 1; i < 32; i++) {
      const dayKey = `${objectKeyPrefix}${String(i).padStart(2, '0')}`;
      if (expenses[dayKey] && Array.isArray(expenses[dayKey])) {
        // Found an expense array for this date, loop through it
        expenses[dayKey].forEach(expenseItem => {
          const categoryIdForExpense = expenseItem.categoryId;
          if (categories.hasOwnProperty(categoryIdForExpense)) {
            if (!categorySpendingMap[categoryIdForExpense]) {
              categorySpendingMap[categoryIdForExpense] = 0;
            }
            categorySpendingMap[categoryIdForExpense] += expenseItem.amount;
          } else {
            // Handle categories that no longer exist
            if (
              !categorySpendingMap[
                'no-category-help-circle-outline-materialcommunityicons'
              ]
            ) {
              categorySpendingMap[
                'no-category-help-circle-outline-materialcommunityicons'
              ] = 0;
            }
            categorySpendingMap[
              'no-category-help-circle-outline-materialcommunityicons'
            ] += expenseItem.amount;
          }
        });
      }
    }

    const categorySpendingKeys = Object.keys(categorySpendingMap);
    if (categorySpendingKeys.length === 0) {
      return <Text style={simpleMessageStyles}>Nothing found...</Text>;
    }

    const inorderCategoryKeys = categorySpendingKeys.sort((a, b) => {
      const mappedCategoryA = categories[a];
      const mappedCategoryB = categories[b];
      if (!mappedCategoryA || !mappedCategoryB) {
        return 0;
      }

      const categoryNameA = mappedCategoryA.categoryName.toUpperCase();
      const categoryNameB = mappedCategoryB.categoryName.toUpperCase();

      if (categoryNameA < categoryNameB) {
        return -1;
      } else if (categoryNameA > categoryNameB) {
        return 1;
      }
      return 0;
    });

    return inorderCategoryKeys.map(k => {
      const mappedCategory = categories[k];
      if (!mappedCategory) {
        console.log('UNMAPPED CATEGORY');
        return null;
      }

      const mappedBudget = budgets[k] || {
        amountBudgeted: null,
      };

      return (
        <CategoryBreakdownItem
          key={k}
          {...mappedCategory}
          {...mappedBudget}
          amount={categorySpendingMap[k]}
        />
      );
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView />
        <View style={blueWrapperStyles}>
          <View style={topContentSectionStyles}>
            <Text style={topContentSectionTitleStyles}>
              {this._renderMonthlyExpensesTotal()}
            </Text>
            <Text style={topContentSectionSubTitleStyles}>Total Spent</Text>
          </View>
          <View style={overlayCardStyles}>
            <Text style={styles.scrollTitles}>Category Breakdown:</Text>
            <ScrollView style={cardScrollViewStyles}>
              {this._renderCategoryBreakdown()}
            </ScrollView>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

// NavParams:
// currentDateKey
// currentMonthString

const MonthScreenWithFirebase = withFirebase(MonthScreen);
MonthScreenWithFirebase.navigationOptions = ({ navigation }) => {
  const currentMonthString = navigation.getParam('currentMonthString', '');
  const currentDateKey = navigation.getParam('currentDateKey', '--');
  const headerTitle = `${currentMonthString} ${currentDateKey.split('-')[0]}`;
  return {
    title: headerTitle,
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: getIcon({
      name: 'arrow-left',
      color: COLORS.black,
      size: 32,
      onPress: () => navigation.goBack(null),
    }),
  };
};

export default MonthScreenWithFirebase;

const styles = StyleSheet.create({
  scrollTitles: {
    ...overlayCardTitleStyles,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
});
