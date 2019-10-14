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
        categoryName: 'Groceries about the USA of America',
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
      {
        iconName: 'glass-cocktail',
        iconLibrary: 'MaterialCommunityIcons',
        categoryName: 'Bars',
        amountSpent: 1289,
        amountBudgeted: 7324,
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
        <View style={blueWrapperStyles}>
          <View style={topContentSectionStyles}>
            <Text style={topContentSectionTitleStyles}>$2,592.50</Text>
            <Text style={topContentSectionSubTitleStyles}>Total Spent</Text>
          </View>
          <View style={overlayCardStyles}>
            <Text style={styles.scrollTitles}>Category Breakdown:</Text>
            <ScrollView style={cardScrollViewStyles}>
              {this._renderCategoryBreakdown()}
            </ScrollView>
            <SafeAreaView />
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollTitles: {
    ...overlayCardTitleStyles,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
});

export default MonthScreen;
