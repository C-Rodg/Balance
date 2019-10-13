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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import IconTextInput from '../Shared/IconTextInput';

// Config
import { icons_materialCommunityList } from '../../config/icons_materialCommunityList';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardWithTopMarginStyles,
  overlayCardTitle,
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
    headerLeft: (
      <MaterialCommunityIcon
        size={32}
        color={COLORS.black}
        name="arrow-left"
        onPress={() => navigation.goBack(null)}
      />
    ),
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
        underlayColor={!isSelected ? COLORS.offWhite : '#555555'}
        onPress={() => this.selectIcon(item)}
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
          borderRadius: 4,
          backgroundColor: !isSelected ? '#fff' : COLORS.blueBackground,
        }}>
        <MaterialCommunityIcon
          color={!isSelected ? COLORS.black : COLORS.white}
          size={36}
          name={item}
        />
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
            <Text style={overlayCardTitle}>Enter a Name:</Text>
            <IconTextInput
              value={this.state.newCategoryName}
              label="Category Name"
              iconName="pencil"
              style={styles.textInput}
              onChange={ev =>
                this.setState({ newCategoryName: ev.nativeEvent.text })
              }
            />
            <Text style={overlayCardTitle}>Choose an Icon:</Text>
            <FlatList
              style={styles.iconFlatList}
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
  iconFlatList: {
    marginVertical: 15,
  },
});
