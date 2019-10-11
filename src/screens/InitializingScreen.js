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
import auth from '@react-native-firebase/auth';

class InitializingScreen extends Component {
  _firebaseListener = null;

  componentDidMount() {
    // Determine if user is logged in or not
    this._firebaseListener = auth().onAuthStateChanged(user => {
      console.log(user);
      this.props.navigation.navigate(user ? 'App' : 'Signup');
    });
  }

  componentWillUnmount() {
    // unsubscribe on unmount
    this._firebaseListener && this._firebaseListener();
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
