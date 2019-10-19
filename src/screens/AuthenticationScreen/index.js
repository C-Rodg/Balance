// Libraries
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';

// Components
import HeaderLogo from './HeaderLogo';
import AuthActionSection from './AuthActionSection';
import IconTextInput from '../Shared/IconTextInput';

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
    // TODO: verify the email and password are valid
    console.log('handle login!');
    const { email, password } = this.state;
    try {
      await auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('App');
    } catch (err) {
      console.log(err.message);
    }
  };

  // LOGIN - send password reset
  handlePasswordReset = async () => {
    // TODO: verify the email
    const { email } = this.state;
    try {
      await auth().sendPasswordResetEmail(email);
      // show some success
    } catch (err) {
      console.log(err.message);
    }
  };

  // SIGN UP - register the new user
  handleSignUp = async () => {
    // TODO: verify valid email and password
    console.log('handle login!');
    const { email, password } = this.state;
    if (!email || !password) {
      return false;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      this.props.navigation.navigate('App');
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
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
                autoCap
                keyboardType="email-address"
                textContentType="emailAddress"
                onChange={ev => this.setState({ email: ev.nativeEvent.text })}
              />
              <IconTextInput
                iconName="lock"
                label="Password"
                value={this.state.password}
                iconColor={COLORS.grayDark}
                autoCapitalize="none"
                autoCompleteType="password"
                textContentType={
                  this.state.isRegisteringAsNew ? 'newPassword' : 'password'
                }
                secureTextEntry={true}
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

export default AuthenticationScreen;

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
