// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import BottomBarButton from '../Shared/BottomBarButton';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import overlayCardStyles from '../../styles/overlayCardStyles';

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

  _renderCategories = () => {};

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={styles.container}>
          <View style={[overlayCardStyles, styles.cardContainer]}>
            <Text style={styles.cardTitleText}>Existing Categories</Text>
            <ScrollView style={styles.categoryScrollView}>
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
  cardContainer: {
    marginTop: 25,
  },
  cardTitleText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
  },
  categoryScrollView: {
    flex: 1,
    backgroundColor: 'red',
    marginVertical: 15,
  },
});
