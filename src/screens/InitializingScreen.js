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
import firebase from 'react-native-firebase';

class InitializingScreen extends Component {
  componentDidMount() {
    // Determine if user is logged in or not
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>TODO: LOGO IMAGE or loading indicator</Text>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default InitializingScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
