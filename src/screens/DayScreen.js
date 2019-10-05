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

class DayScreen extends Component {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Day Screen</Text>
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
