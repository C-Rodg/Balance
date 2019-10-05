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

class BudgetsScreen extends Component {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Budgets Screen...</Text>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default BudgetsScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
