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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import BottomBarButton from '../Shared/BottomBarButton';

// Config
import { defaultCategoryList } from '../../config/defaultCategoryList';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardWithTopMarginStyles,
  overlayCardTitleStyles,
  cardScrollViewStyles,
} from '../../styles/cardStyles';

class CategorySelectScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Select a Category',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: (
      <MaterialCommunityIcon
        size={32}
        color={COLORS.black}
        name="arrow-left"
        onPress={() => navigation.goBack(null)}
      />
    ),
  });

  // Select a category from the list
  selectCategory = categoryObject => {
    // TODO: SET CATEGORY
    console.log(categoryObject);
  };

  // List all of the categories that we know about
  _renderCategories = () => {
    return defaultCategoryList.map(categoryObject => {
      return (
        <TouchableHighlight
          key={categoryObject.iconLibrary + categoryObject.iconName}
          underlayColor={COLORS.gray}
          onPress={() => this.selectCategory(categoryObject)}>
          <View style={styles.categoryItemRow}>
            <MaterialCommunityIcon
              name={categoryObject.iconName}
              size={24}
              color={COLORS.black}
            />
            <Text style={styles.categoryItemText}>
              {categoryObject.categoryName}
            </Text>
          </View>
        </TouchableHighlight>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={styles.container}>
          <View style={overlayCardWithTopMarginStyles}>
            <Text style={overlayCardTitleStyles}>Existing Categories:</Text>
            <ScrollView style={cardScrollViewStyles}>
              {this._renderCategories()}
            </ScrollView>
            <BottomBarButton
              title="Create a new category"
              onButtonPress={() =>
                this.props.navigation.navigate('CategoryNew')
              }
            />
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default CategorySelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  categoryItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
  categoryItemText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    marginLeft: 15,
  },
});
