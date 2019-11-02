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

// HOCs
import withFirebase from '../../hocs/withFirebase';

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

// NEEDS DONE: Error handling, loading in a editable category
class CategoryConfigScreen extends Component {
  state = {
    newCategoryName: '',
    newCategoryIconName: '',
    newCategoryIconLibrary: '',
  };

  componentDidMount() {
    this.props.navigation.setParams({ saveCategory: this._saveCategory });
  }

  _saveCategory = async () => {
    // TODO: save it, set selected, and then navigate back
    try {
      const {
        newCategoryName,
        newCategoryIconName,
        newCategoryIconLibrary,
      } = this.state;

      if (!newCategoryIconName || !newCategoryIconName) {
        console.log('NOT COMPLETE');
        // TODO: show some error message
        return;
      }

      const { firebase } = this.props;
      const categoryId = `${newCategoryName}-${newCategoryIconName}-${newCategoryIconLibrary}`.replace(
        /[^a-zA-Z0-9-]/g,
        '',
      );
      // Create custom category
      await firebase.setNewCategoryItem({
        id: categoryId,
        categoryName: newCategoryName,
        iconLibrary: newCategoryIconLibrary,
        iconName: newCategoryIconName,
      });

      // Navigate back
      this.props.navigation.goBack(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Select an icon
  selectIcon = ({ iconName, iconLibrary }) => {
    this.setState({
      newCategoryIconName: iconName,
      newCategoryIconLibrary: iconLibrary,
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

const CategoryConfigScreenWithFirebase = withFirebase(CategoryConfigScreen);

CategoryConfigScreenWithFirebase.navigationOptions = ({ navigation }) => ({
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
    <TouchableOpacity onPress={navigation.getParam('saveCategory')}>
      <Text style={styles.navigationSaveText}>Save</Text>
    </TouchableOpacity>
  ),
});

export default CategoryConfigScreenWithFirebase;

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
