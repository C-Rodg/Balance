// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Keyboard,
} from 'react-native';

// Components
import CalculatorSection from '../Shared/CalculatorSection';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import { overlayCardWithTopMarginStyles } from '../../styles/cardStyles';
import { offWhiteWrapperStyles } from '../../styles/layout';

class BudgetsAmountScreen extends Component {
  state = {
    currentAmountString: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Set Amount',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: getIcon({
      name: 'arrow-left',
      size: 32,
      onPress: () => navigation.goBack(null),
    }),
  });

  // Calculator section updated
  handleCalculatorChange = newValue => {
    this.setState({
      currentAmountString: newValue,
    });
  };

  // Calculator done with use
  handleCalculatorDone = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={offWhiteWrapperStyles}>
          <View style={styles.overlayCardWithSidePadding}>
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

export default BudgetsAmountScreen;

const styles = StyleSheet.create({
  overlayCardWithSidePadding: {
    ...overlayCardWithTopMarginStyles,
    paddingHorizontal: 15,
  },
});
