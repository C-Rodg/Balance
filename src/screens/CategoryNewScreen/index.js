// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

// Components
import IconTextInput from '../Shared/IconTextInput';

// Config
import { icons_materialCommunityList } from '../../config/icons_materialCommunityList';
import { icons_feather } from '../../config/icons_feather';
import { icons_ionicons } from '../../config/icons_ionicons';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardWithTopMarginStyles,
  overlayCardTitleWithPaddingStyles,
  cardScrollViewStyles,
  textInputStyles,
} from '../../styles/cardStyles';
import { offWhiteWrapperStyles } from '../../styles/layout';
import { horizontalSpacingStyles } from '../../styles/spacing';

// Calculate the number of columns to render
const NumberOfColumns = Math.floor(Dimensions.get('screen').width / 60);

const ICON_ARRAY = [
  ...icons_feather,
  ...icons_ionicons,
  ...icons_materialCommunityList,
];

class CategoryNewScreen extends Component {
  state = {
    newCategoryName: '',
    newCategoryIcon: '',
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
  selectIcon = newCategoryIcon => {
    this.setState({
      newCategoryIcon,
    });
  };

  // Render the list of icons
  _renderIconListItems = ({ item }) => {
    const isSelected = item.icon === this.state.newCategoryIcon;
    return (
      <TouchableHighlight
        id={item.icon}
        underlayColor={!isSelected ? COLORS.gray : COLORS.blueBackground}
        onPress={() => this.selectIcon(item.icon)}
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
          borderRadius: 4,
          backgroundColor: !isSelected ? '#fff' : COLORS.blueMain,
        }}>
        {getIcon({
          name: item.icon,
          size: 36,
          color: !isSelected ? COLORS.black : COLORS.white,
          library: item.library,
        })}
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={offWhiteWrapperStyles}>
          <View style={overlayCardWithTopMarginStyles}>
            <Text style={overlayCardTitleWithPaddingStyles}>Enter a Name:</Text>
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

            <Text style={overlayCardTitleWithPaddingStyles}>
              Choose an Icon:
            </Text>
            <FlatList
              style={cardScrollViewStyles}
              data={ICON_ARRAY}
              renderItem={this._renderIconListItems}
              numColumns={NumberOfColumns}
              keyExtractor={item => `${item.icon}-${item.library}`}
            />
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default CategoryNewScreen;

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
