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

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Components
import IconTextInput from '../Shared/IconTextInput';
import CalculatorSection from '../Shared/CalculatorSection';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';
import { overlayCardStyles } from '../../styles/cardStyles';
import {
  topContentSectionStyles,
  topContentSectionTitleLinkStyles,
  topContentSectionSubTitleStyles,
  blueWrapperStyles,
} from '../../styles/layout';

class AddExpenseScreen extends Component {
  state = {
    expenseTitle: '',
    currentAmountString: '',
  };

  // Calculator section updated
  handleCalculatorChange = newValue => {
    this.setState({
      currentAmountString: newValue,
    });
  };

  // Calculator done with use
  handleCalculatorDone = async () => {
    const { expenseTitle, currentAmountString } = this.state;
    const { firebase } = this.props;
    const amount = parseInt(currentAmountString);
    const currentDateKey = this.props.navigation.getParam('currentDateKey', '');
    const selectedCategory = this.props.navigation.getParam(
      'selectedCategory',
      '',
    );
    const expenseId = this.props.navigation.getParam('expenseId', '');
    if (
      !expenseTitle ||
      !currentAmountString ||
      !currentDateKey ||
      isNaN(amount)
    ) {
      // TODO: show some error
      console.log('SOMETHING WRONGGGG!');
      return;
    }

    const expenseObject = {
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

    // Assign an expense id if we are editing
    if (expenseId) {
      expenseObject.id = expenseId;
    }

    try {
      await firebase.setExpenseItem(expenseObject);
      this.props.navigation.pop();
    } catch (err) {
      console.log(err.message);
    }
  };

  // Render the category icon
  _renderCategoryIcon = () => {
    const selectedCategory = this.props.navigation.getParam(
      'selectedCategory',
      {
        id: 'no-category-help-circle-outline-materialcommunityicons',
        iconName: 'help-circle-outline',
        iconLibrary: 'MaterialCommunityIcons',
      },
    );

    return getIcon({
      name: selectedCategory.iconName,
      library: selectedCategory.iconLibrary,
      color: COLORS.white,
      size: 72,
    });
  };

  // Render the category name
  _renderCategoryName = () => {
    const selectedCategory = this.props.navigation.getParam(
      'selectedCategory',
      {
        id: 'no-category-help-circle-outline-materialcommunityicons',
        categoryName: '-select a category-',
      },
    );
    return selectedCategory.categoryName;
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={blueWrapperStyles}>
          <View style={topContentSectionStyles}>
            {this._renderCategoryIcon()}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CategoryList')}>
              <Text style={topContentSectionTitleLinkStyles} numberOfLines={1}>
                {this._renderCategoryName()}
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
// currentDateKey
// selectedCategory

const AddExpenseScreenWithFirebase = withFirebase(AddExpenseScreen);
AddExpenseScreenWithFirebase.navigationOptions = ({ navigation }) => ({
  title: 'Add Expense',
  headerLeftContainerStyle: {
    paddingLeft: 5,
  },
  headerLeft: getIcon({
    name: 'arrow-left',
    size: 32,
    onPress: () => navigation.goBack(null),
  }),
});

export default AddExpenseScreenWithFirebase;

const styles = StyleSheet.create({
  overwriteCardStyles: {
    paddingTop: 3,
    paddingHorizontal: 15,
  },
});
