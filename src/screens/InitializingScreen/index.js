// Libraries
import React, { Fragment, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

// HOC
import withFirebase from '../../hocs/withFirebase';

function InitializingScreen({ navigation, firebase }) {
  useEffect(() => {
    const firebaseListener = firebase.auth.onAuthStateChanged(authUser => {
      navigation.navigate(authUser ? 'App' : 'Auth');
    });
    return () => {
      firebaseListener();
    };
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView></SafeAreaView>
    </Fragment>
  );
}

export default withFirebase(InitializingScreen);
