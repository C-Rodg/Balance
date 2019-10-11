// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

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
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Log in...</Text>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <Button title="Login" onPress={this.handleLogin} />
            <Button
              title="New User? Sign up now"
              onPress={() => this.props.navigation.navigate('Signup')}
            />
            <Button
              title="Send Password Reset Email"
              onPress={this.handlePasswordReset}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
