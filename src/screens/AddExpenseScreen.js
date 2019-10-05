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
import COLORS from '../styles/colors';

class AddExpenseScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Expense',
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
        <SafeAreaView style={styles.appScreen}>
          <View style={styles.contentWrapper}>
            <View style={styles.categorySection}>
              <MaterialCommunityIcon size={72} color={COLORS.white} name="headphones" />
              <Text>CATEGORY_NAME_CLICKABLE</Text>
              <Text>Total Budget is $1,250</Text>
            </View>
            <View style={styles.calculatorSection}>
              <View style={styles.currentExpenseSection}>
                <Text>$00.00</Text>
              </View>
              <View>
                <Text>Calculator stuff</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default AddExpenseScreen;

const styles = StyleSheet.create({
  appScreen: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentWrapper: {
    flex: 1
  },
  categorySection: {
    backgroundColor: COLORS.blueMain,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 40
  },
  calculatorSection: {
    flex: 1,
    //backgroundColor: COLORS.white,
    //borderRadius: 20,
    //paddingTop:20
    // paddingHorizontal: 15,
   // paddingVertical: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    //elevation: 1,
  },
  currentExpenseSection: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginTop: -20,
    minHeight: 40,
    paddingTop:20,
    paddingHorizontal: 15
  }
});
// TODO FIGURE OUT SHADOW ON TOP ONLY
