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

class SignUpScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  // Sign up the new user
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
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Sign Up Screen...</Text>
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
            <Button title="Sign Up" onPress={this.handleSignUp} />
            <Button
              title="Already have an account? Login"
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
