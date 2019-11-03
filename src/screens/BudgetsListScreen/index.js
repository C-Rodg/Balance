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
import BlockButton from '../Shared/BlockButton';
import SwipeableRow from '../Shared/SwipeableRow';
import IconWrapper from '../Shared/IconWrapper';

// Utils
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';
import { getIcon } from '../../utils/iconNormalizer';
import { showErrorMessage } from '../../utils/toast';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
  simpleMessageStyles,
  cardScrollViewSwipeableStyles,
} from '../../styles/cardStyles';
import {
  topContentSectionStyles,
  topContentSectionTitleStyles,
  topContentSectionSubTitleStyles,
  blueWrapperStyles,
} from '../../styles/layout';

class BudgetsListScreen extends Component {
  // Edit the selected budget
  onBudgetEdit = budgetId => {
    const { budgets, categories, navigation } = this.props;
    const currentBudget = budgets[budgetId];
    const mappedCategory = categories[budgetId];
    const navParams = mappedCategory
      ? {
          previousBudget: currentBudget,
          selectedCategory: { ...mappedCategory },
        }
      : {};
    navigation.navigate('BudgetsConfig', navParams);
  };

  // Delete the selected budget
  onBudgetDelete = async budgetId => {
    try {
      const { firebase } = this.props;
      await firebase.deleteBudgetItem(budgetId);
    } catch (err) {
      showErrorMessage('Unable to delete this category.');
      console.log(err.message);
      // TODO: TEST OFFLINE
    }
  };

  // Render the list of budgets
  _renderBudgetList = () => {
    const { categories, budgets } = this.props;
    const budgetKeys = Object.keys(budgets);

    if (budgetKeys.length === 0) {
      return (
        <Text style={[simpleMessageStyles, styles.sidePadding]}>
          No budgets created...
        </Text>
      );
    }

    return budgetKeys.map(k => {
      const currentBudget = budgets[k];
      const mappedCategory = categories[k];
      if (!mappedCategory) {
        console.log('EMPTY CATEGORY!');
        return null;
      }
      return (
        <SwipeableRow
          rowId={currentBudget.id}
          key={currentBudget.id}
          onEdit={this.onBudgetEdit}
          onDelete={this.onBudgetDelete}
          styles={styles.budgetRow}>
          <IconWrapper
            iconName={mappedCategory.iconName}
            iconLibrary={mappedCategory.iconLibrary}
          />
          <View style={styles.budgetTextView}>
            <Text style={styles.budgetTitleText} numberOfLines={1}>
              {mappedCategory.categoryName}
            </Text>
            <Text style={styles.budgetSubtitleText}>
              {convertAmountToCurrencyString({
                amount: currentBudget.amountBudgeted,
                minimumIntegerDigits: 1,
              })}
            </Text>
          </View>
        </SwipeableRow>
      );
    });
  };

  // Get the total for budgets
  _renderBudgetsTotal = () => {
    const { budgets } = this.props;

    if (Object.keys(budgets).length === 0) {
      return '$00.00';
    }

    let sum = 0;
    Object.keys(budgets).forEach(k => (sum += budgets[k].amountBudgeted));

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
              {this._renderBudgetsTotal()}
            </Text>
            <Text style={topContentSectionSubTitleStyles}>Total Budgeted</Text>
          </View>
          <View style={overlayCardStyles}>
            <Text style={[overlayCardTitleStyles, styles.sidePadding]}>
              Current Budgets:
            </Text>
            <ScrollView style={cardScrollViewSwipeableStyles}>
              {this._renderBudgetList()}
            </ScrollView>
            <View style={styles.sidePadding}>
              <BlockButton
                title="Create a new budget"
                onButtonPress={() =>
                  this.props.navigation.navigate('BudgetsConfig')
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

const BudgetsListScreenWithFirebase = withFirebase(BudgetsListScreen);

BudgetsListScreenWithFirebase.navigationOptions = ({ navigation }) => ({
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

export default BudgetsListScreenWithFirebase;

const styles = StyleSheet.create({
  sidePadding: {
    paddingHorizontal: 15,
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
  budgetRow: {
    marginBottom: 15,
  },
});
