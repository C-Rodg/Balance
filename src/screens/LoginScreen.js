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

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
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
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <Button
              title="New User? Sign up now"
              onPress={() => this.props.navigation.navigate('Signup')}
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
