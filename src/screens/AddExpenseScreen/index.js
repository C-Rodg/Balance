// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Keyboard,
} from 'react-native';

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Components
import IconTextInput from '../Shared/IconTextInput';
import CalculatorSection from '../Shared/CalculatorSection';
import CategoryLinkSection from '../Shared/CategoryLinkSection';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import { showErrorMessage } from '../../utils/toast';

// Styling
import { overlayCardStyles } from '../../styles/cardStyles';
import { blueWrapperStyles } from '../../styles/layout';

class AddExpenseScreen extends Component {
  state = {
    expenseTitle: '',
    currentAmountString: '',
  };

  componentDidMount() {
    // Editing an expense - load in the current data
    const previousExpense = this.props.navigation.getParam(
      'previousExpense',
      null,
    );
    if (previousExpense) {
      this.setState({
        currentAmountString: String(previousExpense.amount),
        expenseTitle: previousExpense.expenseTitle,
      });
    }
  }

  // Calculator section updated
  handleCalculatorChange = newValue => {
    this.setState({
      currentAmountString: newValue,
    });
  };

  // Calculator done with use
  handleCalculatorDone = async () => {
    try {
      const { expenseTitle, currentAmountString } = this.state;
      const { firebase, navigation } = this.props;
      const amount = parseInt(currentAmountString);
      const currentDateKey = navigation.getParam('currentDateKey', '');
      const selectedCategory = navigation.getParam('selectedCategory', '');
      const previousExpense = navigation.getParam('previousExpense', {});

      let errorMessage = null;
      if (!expenseTitle) {
        errorMessage = 'Please provide a title for this expense.';
      } else if (!currentAmountString || amount <= 0) {
        errorMessage = 'Please provide an amount for the expense.';
      } else if (!currentDateKey || isNaN(amount)) {
        errorMessage = 'Something is wrong. Please go back and try again.';
      }

      if (errorMessage) {
        showErrorMessage(errorMessage);
        return;
      }

      const expenseObject = {
        // this adds 'id' and 'createdAt' if editing
        ...previousExpense,
        expenseTitle,
        expenseDate: currentDateKey,
        amount,
      };

      // Set the proper category
      if (!selectedCategory) {
        expenseObject.categoryId =
          'no-category-help-circle-outline-materialcommunityicons';
      } else {
        expenseObject.categoryId = selectedCategory.id;
      }

      // send firebase request
      await firebase.setExpenseItem(expenseObject);
      navigation.pop();
    } catch (err) {
      showErrorMessage('Unable to save the expense at this time.');
      // TODO: HANDLE OFFLINE
      console.log(err.message);
    }
  };

  // Get the required category link section props
  getCategoryLinkProps = () => {
    const { navigation } = this.props;
    const selectedCategory = navigation.getParam('selectedCategory', {});
    return {
      navigation,
      ...selectedCategory,
      submessage: 'No budget set...',
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
            <IconTextInput
              value={this.state.expenseTitle}
              label="What's this for?"
              iconName="pencil"
              onChange={ev =>
                this.setState({ expenseTitle: ev.nativeEvent.text })
              }
            />
            <CalculatorSection
              value={this.state.currentAmountString}
              onCalculatorChange={this.handleCalculatorChange}
              onCalculatorDone={this.handleCalculatorDone}
            />
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

// NavParams:
// -> previousExpense
// -> currentDateKey
// <- selectedCategory

const AddExpenseScreenWithFirebase = withFirebase(AddExpenseScreen);
AddExpenseScreenWithFirebase.navigationOptions = ({ navigation }) => {
  const previousExpense = navigation.getParam('previousExpense', null);
  return {
    title: previousExpense ? 'Edit Expense' : 'Add Expense',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: getIcon({
      name: 'arrow-left',
      size: 32,
      onPress: () => navigation.goBack(null),
    }),
  };
};

export default AddExpenseScreenWithFirebase;

const styles = StyleSheet.create({
  overwriteCardStyles: {
    paddingTop: 3,
    paddingHorizontal: 15,
  },
});
