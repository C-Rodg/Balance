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
        currentAmountString: String(previousBudget.amountBudgeted),
      });
    }
  }

  // Save the current budget
  _saveBudget = async () => {
    console.log('SAVING BUDGET');
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
    const selectedCategory = navigation.getParam('selectedCategory', {});
    return {
      navigation,
      ...selectedCategory,
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
            <Text style={overlayCardTitleStyles}>Set Amount Budgeted:</Text>
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
// previousBudget

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
