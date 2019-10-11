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

class SignUpScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSignUp() {
    console.log('handle sign up!');
  }

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
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
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
