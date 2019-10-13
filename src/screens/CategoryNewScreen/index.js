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
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styling
import COLORS from '../../styles/colors';

class CategoryNewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Category',
    headerLeftContainerStyle: {
      paddingLeft: 5,
    },
    headerLeft: (
      <MaterialCommunityIcon
        size={32}
        color={COLORS.black}
        name="arrow-left"
        onPress={() => navigation.goBack(null)}
      />
    ),
  });

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Text>Configure it all...</Text>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default CategoryNewScreen;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
