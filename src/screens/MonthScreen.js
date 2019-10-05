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

class MonthScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SELECTED_MONTH',
  });

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Month screen</Text>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default MonthScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
