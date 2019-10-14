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

  // Render the list of budgets
  _renderBudgetList = () => {
    const SAMPLE_BUDGETS = [];

    if (SAMPLE_BUDGETS.length === 0) {
      return <Text style={simpleMessageStyles}>No budgets created...</Text>;
    }

    // TODO: MAP THROUGH BUDGETS. Make swipeable...
  };

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
          <View style={overlayCardStyles}>
            <Text style={[overlayCardTitleStyles, styles.sidePadding]}>
              Current Budgets:
            </Text>
            <ScrollView style={cardScrollViewStyles}>
              {this._renderBudgetList()}
            </ScrollView>
            <View style={styles.sidePadding}>
              <BottomBarButton
                title="Create a new budget"
                onButtonPress={() =>
                  this.props.navigation.navigate('BudgetsNew')
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

export default BudgetsScreen;

const styles = StyleSheet.create({
  sidePadding: {
    paddingHorizontal: 15,
  },
});
