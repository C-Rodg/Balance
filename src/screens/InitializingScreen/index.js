// Libraries
import React, { Fragment, Component } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';

class InitializingScreen extends Component {
  _firebaseListener = null;

  componentDidMount() {
    // Determine if user is logged in or not
    this._firebaseListener = auth().onAuthStateChanged(user => {
      console.log(user);
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  componentWillUnmount() {
    // unsubscribe on unmount
    this._firebaseListener && this._firebaseListener();
  }

  render() {
    // Just display a blank screen while determining whether logged in or out
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView></SafeAreaView>
      </Fragment>
    );
  }
}

export default InitializingScreen;
