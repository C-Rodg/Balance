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

// Components
import BottomBarButton from '../Shared/BottomBarButton';
import SwipeableRow from '../Shared/SwipeableRow';
import IconWrapper from '../Shared/IconWrapper';

// Utils
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
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

class BudgetsListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Budgets',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: getIcon({
      name: 'arrow-left',
      size: 32,
      color: COLORS.black,
      onPress: () => navigation.goBack(null),
    }),
  });

  // Edit the selected budget
  onBudgetEdit = budgetId => {
    // TODO: go to edit budget
    console.log('EDITING BUDGET-' + budgetId);
    this.props.navigation.navigate('BudgetsEdit');
  };

  // Delete the selected budget
  onBudgetDelete = budgetId => {
    // TODO: delete the budget
    console.log('DELETING BUDGET-' + budgetId);
  };

  // Render the list of budgets
  _renderBudgetList = () => {
    const SAMPLE_BUDGETS = [
      {
        iconName: 'cart',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Candy',
        amountBudgeted: 200,
      },
      {
        iconName: 'home-city',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Groceries',
        amountBudgeted: 22500,
      },
      {
        iconName: 'truck',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Snacks',
        amountBudgeted: 1350,
      },
      {
        iconName: 'silverware-fork-knife',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Restaurants',
        amountBudgeted: 15000,
      },
      {
        iconName: 'glass-cocktail',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Bars',
        amountBudgeted: 4000,
      },
      {
        iconName: 'airplane',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Traveling All Around the World',
        amountBudgeted: 17300,
      },
      {
        iconName: 'currency-usd',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Investments',
        amountBudgeted: 5500,
      },
      {
        iconName: 'home',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Rent',
        amountBudgeted: 280000,
      },
      {
        iconName: 'dumbbell',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Gym',
        amountBudgeted: 500,
      },
      {
        iconName: 'wallet-giftcard',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Wallets and clothes',
        amountBudgeted: 120,
      },
    ];

    if (SAMPLE_BUDGETS.length === 0) {
      return (
        <Text style={[simpleMessageStyles, styles.sidePadding]}>
          No budgets created...
        </Text>
      );
    }

    return SAMPLE_BUDGETS.map(budgetObject => {
      return (
        <SwipeableRow
          rowId={budgetObject.categoryName}
          key={budgetObject.categoryName}
          onEdit={this.onBudgetEdit}
          onDelete={this.onBudgetDelete}
          styles={{ marginBottom: 15 }}>
          <IconWrapper iconName={budgetObject.iconName} />
          <View style={styles.budgetTextView}>
            <Text style={styles.budgetTitleText} numberOfLines={1}>
              {budgetObject.categoryName}
            </Text>
            <Text style={styles.budgetSubtitleText}>
              {convertAmountToCurrencyString({
                amount: budgetObject.amountBudgeted,
                minimumIntegerDigits: 1,
              })}
            </Text>
          </View>
        </SwipeableRow>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={blueWrapperStyles}>
          <View style={topContentSectionStyles}>
            <Text style={topContentSectionTitleStyles}>$3,598.45</Text>
            <Text style={topContentSectionSubTitleStyles}>Total Budgeted</Text>
          </View>
          <View style={overlayCardStyles}>
            <Text style={[overlayCardTitleStyles, styles.sidePadding]}>
              Current Budgets:
            </Text>
            <ScrollView style={styles.scrollViewCategories}>
              {this._renderBudgetList()}
            </ScrollView>
            <View style={styles.sidePadding}>
              <BottomBarButton
                title="Create a new budget"
                onButtonPress={() =>
                  this.props.navigation.navigate('BudgetsEdit')
                }
              />
            </View>

            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default BudgetsListScreen;

const styles = StyleSheet.create({
  sidePadding: {
    paddingHorizontal: 15,
  },
  scrollViewCategories: {
    ...cardScrollViewStyles,
    paddingRight: 0,
    paddingLeft: 2,
  },
  budgetTextView: {
    overflow: 'hidden',
    flexShrink: 1,
  },
  budgetTitleText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    color: COLORS.black,
    overflow: 'hidden',
  },
  budgetSubtitleText: {
    color: COLORS.grayDark,
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.p,
  },
});
