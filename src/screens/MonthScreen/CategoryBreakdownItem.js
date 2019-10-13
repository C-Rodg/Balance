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
import { overlayCardStyles, overlayCardTitle } from '../../styles/cardStyles';
import {
  topContentSection,
  topContentSectionTitle,
  topContentSectionSubTitle,
} from '../../styles/layout';

class MonthScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "September '21",
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
        <View style={styles.contentWrapper}>
          <View style={topContentSection}>
            <Text style={topContentSectionTitle}>$2,592.50</Text>
            <Text style={topContentSectionSubTitle}>Total Spent</Text>
          </View>
          <View style={overlayCardStyles}>
            <Text style={overlayCardTitle}>Category Breakdown:</Text>
            <ScrollView style={styles.categoryScrollView}></ScrollView>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

export default MonthScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.blueMain,
  },
  categoryScrollView: {
    flex: 1,
  },
});
