// Libraries
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';

// Components
import HeaderLogo from './HeaderLogo';
import AuthActionSection from './AuthActionSection';
import IconTextInput from '../Shared/IconTextInput';

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Utils
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

// Props
import COLORS from '../../styles/colors';

class AuthenticationScreen extends Component {
  state = {
    isRegisteringAsNew: false,
    email: '',
    password: '',
  };

  // LOGIN - attempt to login with current user
  handleLogin = async () => {
    const { email, password } = this.state;
    let errorMessage = null;
    if (!email) {
      errorMessage = 'Please provide a valid email address.';
    } else if (!password) {
      errorMessage = 'Please provide a valid password.';
    }

    if (errorMessage) {
      showErrorMessage(errorMessage);
      return;
    }

    try {
      const { firebase, navigation } = this.props;
      await firebase.signInWithEmailAndPassword(email, password);
      navigation.navigate('App');
    } catch (err) {
      showErrorMessage(
        'Unable to login. Please check your email and password to make sure they are correct.',
      );
      // TODO: TEST OFFLINE
      console.log(err.message);
    }
  };

  // LOGIN - send password reset
  handlePasswordReset = async () => {
    const { email } = this.state;
    if (!email) {
      showErrorMessage('Please enter a valid email address.');
      return;
    }
    try {
      const { firebase } = this.props;
      await firebase.sendPasswordResetEmail(email);
      showSuccessMessage('Password reset sent.');
    } catch (err) {
      showErrorMessage(
        'Unable to send password reset. Please make sure you have a strong internet connection.',
      );
      // TODO: TEST OFFLINE
      console.log(err.message);
    }
  };

  // SIGN UP - register the new user
  handleSignUp = async () => {
    const { email, password } = this.state;
    let errorMessage = null;
    if (!email) {
      errorMessage = 'Please provide a valid email address.';
    } else if (!password) {
      errorMessage = 'Please provide a valid password.';
    }

    if (errorMessage) {
      showErrorMessage(errorMessage);
      return;
    }

    try {
      const { navigation, firebase } = this.props;
      // Signup using the auth module
      const { user } = await firebase.createUserWithEmailAndPassword(
        email,
        password,
      );

      // Create the user in the database
      await firebase.createUserProfileDocument(user);

      // Navigate to main application
      navigation.navigate('App');
    } catch (err) {
      showErrorMessage('Unable to register at this time.');
      // TODO: TEST OFFLINE
      console.log(err.message);
    }
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <HeaderLogo />
            <View style={styles.inputWrapperSection}>
              <IconTextInput
                iconName="email"
                label="Email"
                value={this.state.email}
                iconColor={COLORS.grayDark}
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="done"
                returnKeyLabel="Done"
                onChange={ev => this.setState({ email: ev.nativeEvent.text })}
              />
              <IconTextInput
                iconName="lock"
                label="Password"
                value={this.state.password}
                iconColor={COLORS.grayDark}
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                textContentType={
                  this.state.isRegisteringAsNew ? 'newPassword' : 'password'
                }
                secureTextEntry={true}
                returnKeyType="done"
                returnKeyLabel="Done"
                onChange={ev =>
                  this.setState({ password: ev.nativeEvent.text })
                }
              />

              {this.state.isRegisteringAsNew ? (
                <AuthActionSection
                  actionButtonText="Register"
                  bottomRowText="Already have an account?"
                  bottomRowButtonText="Login"
                  onActionButtonPress={this.handleSignUp}
                  onBottomRowButtonPress={() =>
                    this.setState({ isRegisteringAsNew: false })
                  }
                />
              ) : (
                <AuthActionSection
                  actionButtonText="Login"
                  subActionButtonText="Forgot password?"
                  bottomRowText="Don't have an account?"
                  bottomRowButtonText="Create"
                  onActionButtonPress={this.handleLogin}
                  onSubActionButtonPress={this.handlePasswordReset}
                  onBottomRowButtonPress={() =>
                    this.setState({ isRegisteringAsNew: true, password: '' })
                  }
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default withFirebase(AuthenticationScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
  },
  inputWrapperSection: {
    flex: 4,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});
