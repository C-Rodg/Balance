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
  // Render the list of category breakdowns
  _renderCategoryBreakdown = () => {
    const SAMPLE_BREAKDOWNS = [
      {
        iconName: 'bus',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Transportation',
        amountSpent: 272,
        amountBudgeted: 4000,
      },
      {
        iconName: 'headphones',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Concerts',
        amountSpent: 20000,
        amountBudgeted: 15000,
      },
      {
        iconName: 'laptop-chromebook',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Electronics',
        amountSpent: 39900,
        amountBudgeted: null,
      },
      {
        iconName: 'cart',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Groceries about the USA of America',
        amountSpent: 4800,
        amountBudgeted: 5125,
      },
      {
        iconName: 'silverware-fork-knife',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Restaurants',
        amountSpent: 22399,
        amountBudgeted: null,
      },
      {
        iconName: 'home-city',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Rent',
        amountSpent: 228979,
        amountBudgeted: 9999,
      },
      {
        iconName: 'glass-cocktail',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Bars',
        amountSpent: 1289,
        amountBudgeted: 7324,
      },
    ];

    if (SAMPLE_BREAKDOWNS.length === 0) {
      return <Text style={simpleMessageStyles}>Nothing found...</Text>;
    }

    return SAMPLE_BREAKDOWNS.map(categoryBreakDown => {
      return (
        <CategoryBreakdownItem
          key={`${categoryBreakDown.iconLibrary}-${categoryBreakDown.iconName}`}
          {...categoryBreakDown}
        />
      );
    });
  };

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
