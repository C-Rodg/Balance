// Libraries
import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

// HOCs
import withFirebase from '../../hocs/withFirebase';

// Components
import BlockButton from '../Shared/BlockButton';

// Utils
import { getIcon } from '../../utils/iconNormalizer';
import {
  showConfirmation,
  showErrorMessage,
  showSuccessMessage,
} from '../../utils/toast';

// Styling
import {
  offWhiteWrapperStyles,
  dataRowSectionStyles,
  dataRowSectionTitleStyles,
  dataRowSectionActionRowStyles,
  dataRowSectionLastActionRowStyles,
  dataRowActionRowTextStyles,
} from '../../styles/layout';
import COLORS from '../../styles/colors';

class DataManagementScreen extends Component {
  state = {
    itemsToClear: [],
  };

  // Delete account pressed
  handleDeleteAccount = () => {
    showConfirmation({
      title: 'Delete Account?',
      body:
        'This will permanately delete all data associated with your account. Proceed?',
      okayText: 'Delete',
      okayStyle: 'destructive',
      okayCallback: this.confirmDeleteAccount,
    });
  };

  // Delete account confirmed
  confirmDeleteAccount = async () => {
    const { firebase, navigation } = this.props;
    try {
      // TODO: capture credentials again
      await firebase.deleteCurrentUser();
      this.setState({ itemsToClear: [] });
      showSuccessMessage(`Good bye :'(`);
      navigation.navigate('Auth');
    } catch (err) {
      showErrorMessage('Unable to clear items.');
      console.log(err.message);
      // TODO: HANDLE OFFLINE
    }
  };

  // Clear the selected items
  handleClearSelected = () => {
    const { itemsToClear } = this.state;
    if (!itemsToClear.length) {
      showErrorMessage(`Please first select the items you'd like to clear.`);
      return;
    }

    // show confirmation
    showConfirmation({
      title: 'Clear items?',
      body:
        'This will permanately delete all data associated with these items. Proceed?',
      okayText: 'Clear',
      okayStyle: 'destructive',
      okayCallback: this.confirmItemsCleared,
    });
    // delete the selected items
  };

  // Items cleared confirmed
  confirmItemsCleared = async () => {
    const { firebase } = this.props;
    const { itemsToClear } = this.state;
    try {
      await firebase.deleteUsersCollectionItems(itemsToClear);
      showSuccessMessage('Items cleared!');
      this.setState({ itemsToClear: [] });
    } catch (err) {
      showErrorMessage('Unable to clear items.');
      console.log(err.message);
      // TODO: HANDLE OFFLINE
    }
  };

  // Add or remove clearable items
  addRemoveClearableItem = item => {
    let newItemsToClear = [...this.state.itemsToClear];

    if (~newItemsToClear.indexOf(item)) {
      newItemsToClear = newItemsToClear.filter(f => f !== item);
    } else {
      newItemsToClear.push(item);
    }
    this.setState({
      itemsToClear: newItemsToClear,
    });
  };

  // Get icon style - on or off
  getIconNeeded = item => {
    const { itemsToClear } = this.state;
    if (~itemsToClear.indexOf(item)) {
      return getIcon({
        name: 'ios-checkmark-circle',
        size: 24,
        library: 'ionicons',
        color: COLORS.blueBackground,
      });
    }
    return getIcon({
      name: 'ios-checkmark-circle-outline',
      size: 24,
      library: 'ionicons',
      color: '#d5d5d5',
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <View style={offWhiteWrapperStyles}>
          <SafeAreaView style={styles.container}>
            <View style={styles.mainWrapper}>
              <View style={dataRowSectionStyles}>
                <Text style={dataRowSectionTitleStyles}>Clearable Items</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.addRemoveClearableItem('categories')}
                  style={dataRowSectionActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>
                    Custom Categories
                  </Text>
                  <Text numberOfLines={1}>
                    {this.getIconNeeded('categories')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.addRemoveClearableItem('budgets')}
                  style={dataRowSectionActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>Budgets</Text>
                  <Text numberOfLines={1}>{this.getIconNeeded('budgets')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.addRemoveClearableItem('expenses')}
                  style={dataRowSectionLastActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>Expenses</Text>
                  <Text numberOfLines={1}>
                    {this.getIconNeeded('expenses')}
                  </Text>
                </TouchableOpacity>

                <View style={styles.buttonWrapper}>
                  <BlockButton
                    title="Clear Selected Items"
                    onButtonPress={this.handleClearSelected}
                    buttonStyles={{ marginBottom: 15 }}
                  />
                  <BlockButton
                    title="Delete Account"
                    onButtonPress={this.handleDeleteAccount}
                    buttonStyles={styles.deleteButton}
                    textStyles={styles.deleteText}
                  />
                </View>
              </View>
            </View>
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
  mainWrapper: {
    flex: 1,
    marginTop: 45,
    marginBottom: 15,
  },
  buttonWrapper: {
    margin: 15,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: COLORS.red,
  },
  deleteText: {
    color: COLORS.red,
  },
});
