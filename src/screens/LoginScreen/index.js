// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';

// Components
import IconTextInput from '../Shared/IconTextInput';
import BlockButton from '../Shared/BlockButton';
import SecondaryButton from '../Shared/SecondaryButton';

// Props
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  // Log in with an existing user
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

  // Send a password reset email
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

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.logoWrapper}>
              <Image
                resizeMode="contain"
                style={styles.logoImage}
                source={require('../../assets/BalanceLogo.png')}
              />
              <Text style={styles.balanceText}>Balance</Text>
              <Text style={styles.balanceSubText}>balance your life</Text>
            </View>
            <View style={styles.inputWrapperSection}>
              <IconTextInput
                iconName="email"
                label="Email"
                value={this.state.email}
                iconColor={COLORS.grayDark}
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChange={ev => this.setState({ email: ev.nativeEvent.text })}
              />
              <IconTextInput
                iconName="lock"
                label="Password"
                value={this.state.password}
                iconColor={COLORS.grayDark}
                autoCompleteType="password"
                textContentType="password"
                secureTextEntry={true}
                onChange={ev =>
                  this.setState({ password: ev.nativeEvent.text })
                }
              />

              <View style={{ marginVertical: 35 }}>
                <BlockButton title="Login" onButtonPress={this.handleLogin} />
                <TouchableOpacity onPress={this.handlePasswordReset}>
                  <Text style={styles.forgottenText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomSection}>
                <View style={styles.bottomSectionRow}>
                  <Text style={styles.bottomItemText}>
                    Don't have an account?
                  </Text>
                  <SecondaryButton
                    title="Create"
                    onButtonPress={() =>
                      this.props.navigation.navigate('Signup')
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoWrapper: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 220,
    height: undefined,
    alignItems: 'center',
    flex: 1,
  },
  balanceText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.h4,
    color: COLORS.black,
  },
  balanceSubText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.s1,
    color: COLORS.black,
    opacity: 0.7,
  },
  inputWrapperSection: {
    flex: 4,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  forgottenText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.s1,
    color: COLORS.black,
    opacity: 0.7,
    textAlign: 'center',
    paddingVertical: 10,
  },
  bottomSection: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  bottomSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomItemText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.p,
    color: COLORS.black,
    marginRight: 15,
  },
});
