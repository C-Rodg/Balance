// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styling
import FONTS, { getFontFamilyStyles } from '../styles/fonts';
import COLORS from '../styles/colors';

class DayScreen extends Component {
  // Setup navigation bar
  static navigationOptions = ({ navigation }) => ({
    title: 'Balance',
    headerLeftContainerStyle: {
      paddingLeft: 10,
    },
    headerLeft: (
      <MaterialCommunityIcon
        size={32}
        color={COLORS.black}
        name="settings-outline"
        onPress={() => navigation.navigate('Settings')}
      />
    ),
    headerRightContainerStyle: {
      paddingRight: 10,
    },
    headerRight: (
      <MaterialCommunityIcon
        size={32}
        color={COLORS.black}
        name="calendar-text-outline"
        onPress={() => navigation.navigate('Budgets')}
      />
    ),
  });

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.dateSection}>
            <Text style={styles.yearText}>2020</Text>
            <View style={styles.monthSection}>
              <TouchableOpacity style={styles.monthArrow}>
                <MaterialCommunityIcon
                  size={38}
                  color={COLORS.black}
                  name="chevron-left"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Month')}>
                <Text style={styles.monthText}>September</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.monthArrow}>
                <MaterialCommunityIcon
                  size={38}
                  color={COLORS.black}
                  name="chevron-right"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.dayText}>29</Text>
            </View>
            <TouchableOpacity
              style={styles.addExpenseButton}
              onPress={() => this.props.navigation.navigate('AddExpense')}>
              <Image
                style={styles.addExpenseButtonImage}
                resizeMode="contain"
                source={require('../assets/AddExpenseLogo.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.expenseSection}></View>
        </View>
      </Fragment>
    );
  }
}

export default DayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  dateSection: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  expenseSection: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  yearText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h6,
    color: COLORS.gray,
    textAlign: 'center',
    letterSpacing: 1,
  },
  monthSection: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h3,
    color: COLORS.black,
    textDecorationLine: 'underline',
    lineHeight: FONTS.sizes.h3 + 5,
  },
  monthArrow: {
    paddingHorizontal: 10,
  },
  dayText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.b4,
    textAlign: 'center',
  },
  addExpenseButton: {
    flex: 1,
    flexShrink: 1,
  },
  addExpenseButtonImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
