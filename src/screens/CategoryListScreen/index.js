// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

// Components
import BlockButton from '../Shared/BlockButton';
import IconTextInput from '../Shared/IconTextInput';
import SwipeableRow from '../Shared/SwipeableRow';

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
  cardScrollViewSwipeableStyles,
  textInputStyles,
} from '../../styles/cardStyles';
import { offWhiteWrapperStyles } from '../../styles/layout';
import { horizontalSpacingStyles } from '../../styles/spacing';

class CategoryListScreen extends Component {
  state = {
    searchTerm: '',
  };

  // Select a category from the list
  selectCategory = categoryId => {
    // TODO: SET CATEGORY
    console.log(categoryId);
  };

  onCategoryEdit = categoryId => {
    // TODO: EDIT CATEGORY
    console.log(categoryId);
  };

  onCategoryDelete = categoryId => {
    // TODO: DELETE CATEGORY
    console.log(categoryId);
  };

  // Render the category list
  _renderCategories = () => {
    const { categories } = this.props;
    const upperSearchTerm = this.state.searchTerm.toUpperCase();
    const categoryArray = Object.keys(categories).map(k => ({
      ...categories[k],
    }));
    return categoryArray
      .filter(categoryObject => {
        const upperCategoryName = categoryObject.categoryName.toUpperCase();
        return upperCategoryName.indexOf(upperSearchTerm) > -1;
      })
      .map(categoryObject => {
        const isStandardCategory = categoryObject.isStandardCategory;
        return (
          <SwipeableRow
            rowId={categoryObject.id}
            key={categoryObject.id}
            onEdit={this.onCategoryEdit}
            onDelete={this.onCategoryDelete}
            hideEdit={true}
            hideDelete={isStandardCategory}>
            <TouchableHighlight
              underlayColor={COLORS.gray}
              onPress={() => this.selectCategory(categoryObject.id)}>
              <View style={styles.categoryItemRow}>
                {getIcon({
                  name: categoryObject.iconName,
                  library: categoryObject.iconLibrary,
                  size: 24,
                  color: COLORS.black,
                })}
                <Text style={styles.categoryItemText}>
                  {categoryObject.categoryName}
                </Text>
              </View>
            </TouchableHighlight>
          </SwipeableRow>
        );
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
              Existing Categories:
            </Text>
            <View style={horizontalSpacingStyles}>
              <IconTextInput
                value={this.state.searchTerm}
                label="Search for a category"
                iconName="magnify"
                style={textInputStyles}
                onChange={ev =>
                  this.setState({ searchTerm: ev.nativeEvent.text })
                }
              />
            </View>
            <ScrollView style={cardScrollViewSwipeableStyles}>
              {this._renderCategories()}
            </ScrollView>
            <View style={styles.horizontalPadding}>
              <BlockButton
                title="Create a new category"
                onButtonPress={() =>
                  this.props.navigation.navigate('CategoryConfig')
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

const CategoryListScreenWithFirebase = withFirebase(CategoryListScreen);

CategoryListScreenWithFirebase.navigationOptions = ({ navigation }) => ({
  title: 'Select a Category',
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

export default CategoryListScreenWithFirebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  categoryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItemText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    marginLeft: 15,
  },
  horizontalPadding: {
    paddingHorizontal: 15,
  },
});
