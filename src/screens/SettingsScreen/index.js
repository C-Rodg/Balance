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

class SettingsScreen extends Component {
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

  handleManageData = () => {
    // TODO: navigate to data management
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
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Account</Text>
                <View style={styles.actionRow}>
                  <Text style={styles.actionRowText}>Email</Text>
                  <Text style={styles.actionRowSubText} numberOfLines={1}>
                    {userInfo.email}
                  </Text>
                </View>
                <View style={styles.actionRow}>
                  <Text style={styles.actionRowText}>Account Created</Text>
                  <Text style={styles.actionRowSubText} numberOfLines={1}>
                    {userInfo.createdAt}
                  </Text>
                </View>
                <View style={[styles.actionRow, styles.bottomBorderStyles]}>
                  <Text style={styles.actionRowText}>Total Spent</Text>
                  <Text style={styles.actionRowSubText} numberOfLines={1}>
                    TODO: SOME EXPENSE TOTAL
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Data</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleExportData}
                  style={styles.actionRow}>
                  <Text style={styles.actionRowText}>Export to CSV</Text>
                  <Text style={styles.actionRowSubText} numberOfLines={1}>
                    {getIcon({ name: 'chevron-right', size: 21 })}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleManageData}
                  style={[styles.actionRow, styles.bottomBorderStyles]}>
                  <Text style={styles.actionRowText}>Manage Data</Text>
                  <Text style={styles.actionRowSubText} numberOfLines={1}>
                    {getIcon({ name: 'chevron-right', size: 21 })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.actionBlock}>
                  <Text style={[styles.actionRowText, { marginBottom: 10 }]}>
                    Balance's goal is to make expense tracking simplified. Setup
                    your personal categories & budgets and then start tracking
                    to see where you spend, so you can know where to save.
                  </Text>
                  <Text style={[styles.actionRowText, { marginBottom: 12 }]}>
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
                  style={[styles.actionRow, styles.bottomBorderStyles]}>
                  <Text style={styles.actionRowText}>
                    Take a tour of the app!
                  </Text>
                  <Text style={styles.actionRowSubText} numberOfLines={1}>
                    {getIcon({ name: 'chevron-right', size: 21 })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.handleLogout}
                  style={[styles.actionRow, styles.bottomBorderStyles]}>
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    ...getFontFamilyStyles('medium'),
    textTransform: 'uppercase',
    paddingHorizontal: 15,
    letterSpacing: 0.8,
    fontSize: FONTS.sizes.s1,
    color: COLORS.black,
    marginBottom: 5,
  },
  actionRow: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  actionBlock: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
  },
  bottomBorderStyles: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  actionRowText: {
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.p,
    color: COLORS.black,
    marginRight: 10,
  },
  actionRowSubText: {
    ...getFontFamilyStyles('regular'),
    fontSize: FONTS.sizes.p,
    color: COLORS.black,
    opacity: 0.6,
    flexShrink: 1,
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
