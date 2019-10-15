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

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardWithTopMarginStyles,
  overlayCardTitleStyles,
  cardScrollViewStyles,
} from '../../styles/cardStyles';

// Calculate the number of columns to render
const NumberOfColumns = Math.floor(Dimensions.get('screen').width / 60);

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
    const isSelected = item === this.state.newCategoryIcon;
    return (
      <TouchableHighlight
        id={item}
        underlayColor={!isSelected ? COLORS.gray : COLORS.blueBackground}
        onPress={() => this.selectIcon(item)}
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
          name: item,
          size: 36,
          color: !isSelected ? COLORS.black : COLORS.white,
        })}
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={styles.container}>
          <View style={overlayCardWithTopMarginStyles}>
            <Text style={styles.titleStyles}>Enter a Name:</Text>
            <View style={styles.horizontalPadding}>
              <IconTextInput
                value={this.state.newCategoryName}
                label="Category Name"
                iconName="pencil"
                style={styles.textInput}
                onChange={ev =>
                  this.setState({ newCategoryName: ev.nativeEvent.text })
                }
              />
            </View>

            <Text style={styles.titleStyles}>Choose an Icon:</Text>
            <FlatList
              style={cardScrollViewStyles}
              data={icons_materialCommunityList}
              renderItem={this._renderIconListItems}
              numColumns={NumberOfColumns}
              keyExtractor={item => item}
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
  textInput: {
    marginTop: 10,
    marginBottom: 35,
  },
  titleStyles: {
    ...overlayCardTitleStyles,
    paddingHorizontal: 15,
  },
  horizontalPadding: {
    paddingHorizontal: 15,
  },
});
