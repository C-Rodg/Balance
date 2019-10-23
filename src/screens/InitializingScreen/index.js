// Libraries
import React, { Fragment, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

// Services
import { auth } from '../../services/firebase';

function InitializingScreen({ navigation }) {
  useEffect(() => {
    const firebaseListener = auth.onAuthStateChanged(authUser => {
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

export default InitializingScreen;
