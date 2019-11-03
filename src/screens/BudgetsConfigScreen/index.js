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

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Components
import CategoryLinkSection from '../Shared/CategoryLinkSection';
import CalculatorSection from '../Shared/CalculatorSection';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import { showErrorMessage } from '../../utils/toast';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
} from '../../styles/cardStyles';
import { blueWrapperStyles } from '../../styles/layout';

class BudgetsConfigScreen extends Component {
  state = {
    isEditingBudget: false,
    currentAmountString: '',
  };

  componentDidMount() {
    this.props.navigation.setParams({ saveBudget: this._saveBudget });
    const previousBudget = this.props.navigation.getParam(
      'previousBudget',
      null,
    );
    if (previousBudget) {
      this.setState({
        isEditingBudget: true,
        currentAmountString: String(previousBudget.amountBudgeted),
      });
    }
  }

  // Save the current budget
  _saveBudget = async () => {
    try {
      const { firebase, navigation } = this.props;
      const { currentAmountString } = this.state;
      const amountBudgeted = parseInt(currentAmountString);
      const selectedCategory = navigation.getParam('selectedCategory', '');

      let errorMessage = null;
      if (!selectedCategory) {
        errorMessage = 'Please select a category to tie this budget to.';
      } else if (
        !currentAmountString ||
        isNaN(amountBudgeted) ||
        amountBudgeted <= 0
      ) {
        errorMessage = 'Please provide an amounted to be budgeted';
      }

      if (errorMessage) {
        showErrorMessage(errorMessage);
        return;
      }

      const previousBudget = navigation.getParam('previousBudget', {
        id: selectedCategory.id,
      });
      const budgetObject = {
        // adds 'id' if was previously created or new category id if not
        ...previousBudget,
        amountBudgeted,
      };

      // send firebase request
      await firebase.setBudgetItem(budgetObject);

      // Navigate back
      navigation.goBack(null);
    } catch (err) {
      showErrorMessage('Unable to save the budget at this time.');
      console.log(err.message);
      // TODO: TEST OFFLINE
    }
  };

  // Calculator section updated
  handleCalculatorChange = newValue => {
    this.setState({
      currentAmountString: newValue,
    });
  };

  // Get the required category link section props
  getCategoryLinkProps = () => {
    const { navigation } = this.props;
    const { isEditingBudget } = this.state;
    const selectedCategory = navigation.getParam('selectedCategory', {});
    return {
      ...selectedCategory,
      navigation,
      isDisabled: isEditingBudget,
      navigateWith: { navigateTo: 'BudgetsConfig' },
    };
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView />
        <View style={blueWrapperStyles}>
          <CategoryLinkSection {...this.getCategoryLinkProps()} />
          <View style={[overlayCardStyles, styles.overwriteCardStyles]}>
            <Text style={overlayCardTitleStyles}>Monthly Budget:</Text>
            <CalculatorSection
              value={this.state.currentAmountString}
              onCalculatorChange={this.handleCalculatorChange}
              onCalculatorDone={this._saveBudget}
            />
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

// NavParams:
// -> previousBudget
// <- selectedCategory

const BudgetsConfigScreenWithFirebase = withFirebase(BudgetsConfigScreen);
BudgetsConfigScreenWithFirebase.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('previousBudget', null)
    ? 'Edit Budget'
    : 'New Budget',
  headerLeftContainerStyle: {
    paddingLeft: 5,
  },
  headerLeft: getIcon({
    name: 'arrow-left',
    color: COLORS.black,
    size: 32,
    onPress: () => navigation.goBack(null),
  }),
  headerRight: (
    <TouchableOpacity onPress={navigation.getParam('saveBudget')}>
      <Text style={styles.navigationSaveText}>Save</Text>
    </TouchableOpacity>
  ),
});

export default BudgetsConfigScreenWithFirebase;

const styles = StyleSheet.create({
  navigationSaveText: {
    color: COLORS.black,
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    paddingRight: 3,
  },
  overwriteCardStyles: {
    paddingHorizontal: 15,
  },
});
