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
import CategoryBreakdownItem from './CategoryBreakdownItem';

// Styling
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';
import {
  overlayCardStyles,
  overlayCardTitleStyles,
  simpleMessageStyles,
} from '../../styles/cardStyles';
import {
  topContentSectionStyles,
  topContentSectionTitleStyles,
  topContentSectionSubTitleStyles,
} from '../../styles/layout';

class MonthScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    // TODO: get this value from incoming props
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

  // Render the list of category breakdowns
  _renderCategoryBreakdown = () => {
    const SAMPLE_BREAKDOWNS = [
      {
        iconName: 'bus',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Transportation',
        amountSpent: 272,
        amountBudgeted: 4000,
      },
      {
        iconName: 'headphones',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Concerts',
        amountSpent: 20000,
        amountBudgeted: 15000,
      },
      {
        iconName: 'laptop-chromebook',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Electronics',
        amountSpent: 39900,
        amountBudgeted: null,
      },
      {
        iconName: 'cart',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Groceries',
        amountSpent: 4800,
        amountBudgeted: 5125,
      },
      {
        iconName: 'silverware-fork-knife',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Restaurants',
        amountSpent: 22399,
        amountBudgeted: null,
      },
      {
        iconName: 'home-city',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Rent',
        amountSpent: 228979,
        amountBudgeted: 9999,
      },
    ];

    if (SAMPLE_BREAKDOWNS.length === 0) {
      return <Text style={simpleMessageStyles}>Nothing found...</Text>;
    }

    return SAMPLE_BREAKDOWNS.map(categoryBreakDown => {
      return (
        <CategoryBreakdownItem
          key={`${categoryBreakDown.iconLibrary}-${categoryBreakDown.iconName}`}
          {...categoryBreakDown}
        />
      );
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <View style={styles.contentWrapper}>
          <View style={topContentSectionStyles}>
            <Text style={topContentSectionTitleStyles}>$2,592.50</Text>
            <Text style={topContentSectionSubTitleStyles}>Total Spent</Text>
          </View>
          <View style={overlayCardStyles}>
            <Text style={overlayCardTitleStyles}>Category Breakdown:</Text>
            <ScrollView style={styles.categoryScrollView}>
              {this._renderCategoryBreakdown()}
            </ScrollView>
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
    marginVertical: 10,
  },
});
