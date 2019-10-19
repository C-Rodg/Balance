// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: getIcon({
      name: 'arrow-left',
      size: 32,
      color: COLORS.black,
      onPress: () => navigation.goBack(null),
    }),
  });

  // Logout of the application
  handleLogout = async () => {
    try {
      await auth().signOut();
      this.props.navigation.navigate('Auth');
    } catch (err) {
      console.log(err.message);
    }
  };

  // Reset the category list
  resetCategoryList = () => {
    // TODO:
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Settings and things...</Text>
            <Button title="Logout" onPress={this.handleLogout} />
            <Button title="Reset Categories" onPress={this.resetCategoryList} />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
