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

class CategoryConfigScreen extends Component {
  state = {
    newCategoryName: '',
    newCategoryIconName: '',
    newCategoryIconLibrary: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'New Category',
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
      newCategoryIconName: icon,
      newCategoryIconLibrary: library,
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
              Enter a Category Name:
            </Text>
            <View style={horizontalSpacingStyles}>
              <IconTextInput
                value={this.state.newCategoryName}
                label="Category Name"
                iconName="pencil"
                style={textInputStyles}
                onChange={ev =>
                  this.setState({ newCategoryName: ev.nativeEvent.text })
                }
              />
            </View>

            <IconSelectionSection
              selectedName={this.state.newCategoryIconName}
              onIconSelect={this.selectIcon}
            />
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default CategoryConfigScreen;

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
