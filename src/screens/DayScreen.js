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
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styling
import FONTS from '../styles/fonts';
import COLORS from '../styles/colors';

class DayScreen extends Component {
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
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={{ fontFamily: FONTS.family.monoMedium }}>
              Day Screen
            </Text>
            <Button
              title="Add Expense"
              onPress={() => this.props.navigation.navigate('AddExpense')}
            />
            <Button
              title="Settings"
              onPress={() => this.props.navigation.navigate('Settings')}
            />
            <Button
              title="Month"
              onPress={() => this.props.navigation.navigate('Month')}
            />
            <Button
              title="Budgets"
              onPress={() => this.props.navigation.navigate('Budgets')}
            />

            <MaterialCommunityIcon size={32} color="#000" name="arrow-left" />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default DayScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
