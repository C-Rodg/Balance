// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class InitializingScreen extends Component {
  async componentDidMount() {
    // Determine if user is logged in or not
    try {
      const hasToken = true;
      if (hasToken) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch (err) {
      console.log(err);
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>TODO: LOGO IMAGE</Text>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default InitializingScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
