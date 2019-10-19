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

// Components
import IconTextInput from '../Shared/IconTextInput';
import IconSelectionSection from '../Shared/IconSelectionSection';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardWithTopMarginStyles,
  overlayCardTitleWithPaddingStyles,
  textInputStyles,
} from '../../styles/cardStyles';
import { offWhiteWrapperStyles } from '../../styles/layout';
import { horizontalSpacingStyles } from '../../styles/spacing';

class BudgetsConfigScreen extends Component {
  state = {
    newBudgetName: '',
    newBudgetIconName: '',
    newBudgetIconLibrary: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'New Budget', // TODO: CHANGE TO EDIT OR NEW
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
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Text style={styles.navigationSaveText}>Save</Text>
      </TouchableOpacity>
    ),
  });

  // Select an icon
  selectIcon = ({ icon, library }) => {
    this.setState({
      newBudgetIconName: icon,
      newBudgetIconLibrary: library,
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={offWhiteWrapperStyles}>
          <View style={overlayCardWithTopMarginStyles}>
            <Text style={overlayCardTitleWithPaddingStyles}>
              Enter a Budget Name:
            </Text>
            <View style={horizontalSpacingStyles}>
              <IconTextInput
                value={this.state.newBudgetName}
                label="Budget Name"
                iconName="pencil"
                style={textInputStyles}
                onChange={ev =>
                  this.setState({ newBudgetName: ev.nativeEvent.text })
                }
              />
            </View>

            <IconSelectionSection
              selectedName={this.state.newBudgetIconName}
              onIconSelect={this.selectIcon}
            />
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default BudgetsConfigScreen;

const styles = StyleSheet.create({
  navigationSaveText: {
    color: COLORS.black,
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    paddingRight: 3,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
});