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
import { convertAmountToCurrencyString } from '../../utils/moneyFormatter';

// Styling
import {
  offWhiteWrapperStyles,
  dataRowSectionStyles,
  dataRowSectionTitleStyles,
  dataRowSectionActionRowStyles,
  dataRowSectionLastActionRowStyles,
  dataRowActionRowTextStyles,
  dataRowActionRowSubTextStyles,
} from '../../styles/layout';
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

class SettingsScreen extends Component {
  state = {
    expenseTotal: '',
  };

  componentDidMount() {
    this.calculateExpensesTotal();
  }

  // Calculate expense total
  calculateExpensesTotal = () => {
    const { expenses } = this.props;
    let sum = 0;

    // Loop over all expenses
    const expenseKeys = Object.keys(expenses);
    expenseKeys.forEach(k => {
      const expenseDate = expenses[k];
      if (Array.isArray(expenseDate)) {
        expenseDate.forEach(expense => {
          if (expense.amount) {
            sum += expense.amount;
          }
        });
      }
    });

    let sumString = '';
    if (sum === 0) {
      sumString = '$00.00';
    } else {
      sumString = convertAmountToCurrencyString({ amount: sum });
    }

    this.setState({
      expenseTotal: sumString,
    });
  };

  // Logout of the application
  handleLogout = async () => {
    try {
      const { firebase, navigation } = this.props;
      await firebase.signOut();
      navigation.navigate('Auth');
    } catch (err) {
      showErrorMessage('Unable to logout right now.');
      console.log(err.message);
    }
  };

  handleExportData = () => {
    // TODO: export to csv
  };

  // Navigate to Data Management
  handleManageData = () => {
    this.props.navigation.navigate('DataManagement');
  };

  handleAppTour = () => {
    // TODO: start app tour
  };

  handleSupportLink = () => {
    // TODO: use Linking to open URL
  };

  // Safely get user info
  getUserInfo = () => {
    const { user } = this.props;
    const info = {
      email: '',
      createdAt: '',
    };

    if (user && user.email) {
      info.email = user.email;
    }

    if (user && user.createdAt) {
      const createdDate = user.createdAt.toDate();
      info.createdAt = createdDate.toDateString();
    }

    return info;
  };

  render() {
    const userInfo = this.getUserInfo();

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <View style={offWhiteWrapperStyles}>
          <SafeAreaView style={styles.container}>
            <ScrollView
              style={styles.settingsWrapper}
              contentContainerStyle={{ flexGrow: 1 }}>
              <View style={dataRowSectionStyles}>
                <Text style={dataRowSectionTitleStyles}>My Account</Text>
                <View style={dataRowSectionActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>Email</Text>
                  <Text style={dataRowActionRowSubTextStyles} numberOfLines={1}>
                    {userInfo.email}
                  </Text>
                </View>
                <View style={dataRowSectionActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>
                    Account Created
                  </Text>
                  <Text style={dataRowActionRowSubTextStyles} numberOfLines={1}>
                    {userInfo.createdAt}
                  </Text>
                </View>
                <View style={dataRowSectionLastActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>Total Spent</Text>
                  <Text style={dataRowActionRowSubTextStyles} numberOfLines={1}>
                    {this.state.expenseTotal}
                  </Text>
                </View>
              </View>

              <View style={dataRowSectionStyles}>
                <Text style={dataRowSectionTitleStyles}>Data</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleExportData}
                  style={dataRowSectionActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>Export to CSV</Text>
                  <Text style={dataRowActionRowSubTextStyles} numberOfLines={1}>
                    {getIcon({ name: 'chevron-right', size: 21 })}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleManageData}
                  style={dataRowSectionLastActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>Manage Data</Text>
                  <Text style={dataRowActionRowSubTextStyles} numberOfLines={1}>
                    {getIcon({ name: 'chevron-right', size: 21 })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={dataRowSectionStyles}>
                <Text style={dataRowSectionTitleStyles}>About</Text>
                <View style={styles.actionBlock}>
                  <Text
                    style={[dataRowActionRowTextStyles, { marginBottom: 10 }]}>
                    Balance's goal is to make expense tracking simplified. Setup
                    your personal categories & budgets and then start tracking
                    to see where you spend, so you can know where to save.
                  </Text>
                  <Text
                    style={[dataRowActionRowTextStyles, { marginBottom: 12 }]}>
                    Have questions or comments? Feel free to reach out at:
                  </Text>

                  <TouchableOpacity
                    onPress={this.handleSupportLink}
                    activeOpacity={0.6}>
                    <Text style={styles.linkText}>
                      https://curtisrodgers.com/
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleAppTour}
                  style={dataRowSectionLastActionRowStyles}>
                  <Text style={dataRowActionRowTextStyles}>
                    Take a tour of the app!
                  </Text>
                  <Text style={dataRowActionRowSubTextStyles} numberOfLines={1}>
                    {getIcon({ name: 'chevron-right', size: 21 })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={dataRowSectionStyles}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleLogout}
                  style={dataRowSectionLastActionRowStyles}>
                  <Text style={styles.linkText}>Log out</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.scrollViewEnd}>
                <Text style={styles.versionText}>Version 1.0.0 (2013478)</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Fragment>
    );
  }
}

const SettingsScreenWithFirebase = withFirebase(SettingsScreen);

SettingsScreenWithFirebase.navigationOptions = ({ navigation }) => ({
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

export default SettingsScreenWithFirebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsWrapper: {
    paddingVertical: 15,
    flex: 1,
  },
  scrollViewEnd: {
    marginBottom: 25,
    justifyContent: 'flex-end',
    flex: 1,
  },
  actionBlock: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
  },
  linkText: {
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.p,
    color: COLORS.black,
    color: COLORS.blueBackground,
  },
  versionText: {
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.s2,
    color: COLORS.black,
    textAlign: 'center',
    textTransform: 'uppercase',
    opacity: 0.7,
  },
});
