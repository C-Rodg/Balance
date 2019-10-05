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

class DayScreen extends Component {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Day Screen</Text>
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
