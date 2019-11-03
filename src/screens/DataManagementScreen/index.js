// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import { showErrorMessage } from '../../utils/toast';

// Styling
import { offWhiteWrapperStyles } from '../../styles/layout';
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

class DataManagementScreen extends Component {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <View style={offWhiteWrapperStyles}>
          <SafeAreaView style={styles.container}>
            <Text>FOooooooo</Text>
          </SafeAreaView>
        </View>
      </Fragment>
    );
  }
}

const DataManagementScreenWithFirebase = withFirebase(DataManagementScreen);

DataManagementScreenWithFirebase.navigationOptions = ({ navigation }) => ({
  title: 'Data Management',
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

export default DataManagementScreenWithFirebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
