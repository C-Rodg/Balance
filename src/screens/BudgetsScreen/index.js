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

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
  simpleMessageStyles,
  cardScrollViewStyles,
} from '../../styles/cardStyles';
import {
  topContentSectionStyles,
  topContentSectionTitleStyles,
  topContentSectionSubTitleStyles,
  blueWrapperStyles,
} from '../../styles/layout';

class BudgetsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Budgets',
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

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={blueWrapperStyles}>
          <View style={topContentSectionStyles}>
            <Text style={topContentSectionTitleStyles}>$3,598.45</Text>
            <Text style={topContentSectionSubTitleStyles}>Total Budgeted</Text>
          </View>
          <View style={[overlayCardStyles, styles.overwriteCardStyles]}>
            <Text style={overlayCardTitleStyles}>Current Budgets:</Text>
            <ScrollView style={cardScrollViewStyles}></ScrollView>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default BudgetsScreen;

const styles = StyleSheet.create({
  overwriteCardStyles: {
    paddingHorizontal: 0,
  },
});
