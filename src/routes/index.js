// Libraries
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  StackViewTransitionConfigs,
  StackViewStyleInterpolator,
} from 'react-navigation-stack';
import 'intl';
import 'intl/locale-data/jsonp/en-US';

// Screens
import InitializingScreen from '../screens/InitializingScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import DayScreen from '../screens/DayScreen';
import MonthScreen from '../screens/MonthScreen';
import BudgetsListScreen from '../screens/BudgetsListScreen';
import BudgetsConfigScreen from '../screens/BudgetsConfigScreen';
import BudgetsAmountScreen from '../screens/BudgetsAmountScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import CategoryConfigScreen from '../screens/CategoryConfigScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DataManagementScreen from '../screens/DataManagementScreen';

// Providers
import FirebaseProvider from '../providers/FirebaseProvider';
import DateProvider from '../providers/DateProvider';

// Props
import FONTS from '../styles/fonts';
import COLORS from '../styles/colors';

// Default header props
const defaultNavigationOptions = {
  // headerStyle: {
  // 	elevation: 0, // remove shadow on android
  // 	borderBottomWidth: 0, // remove border on iOS
  // },
  headerTitleStyle: {
    fontFamily: FONTS.family.medium,
    fontWeight: FONTS.weights.medium,
    fontSize: FONTS.sizes.h5,
    color: COLORS.black,
  },
  headerRightContainerStyle: {
    paddingRight: 10,
  },
};

const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  let isCustom = false;

  if (
    // Day -> Settings
    (transitionProps.scene.route.routeName === 'Settings' &&
      (prevTransitionProps &&
        prevTransitionProps.scene.route.routeName === 'Day')) ||
    // Settings -> Day
    (transitionProps.scene.route.routeName === 'Day' &&
      (prevTransitionProps &&
        prevTransitionProps.scene.route.routeName === 'Settings')) ||
    // Day -> Budgets
    (transitionProps.scene.route.routeName === 'BudgetsList' &&
      (prevTransitionProps &&
        prevTransitionProps.scene.route.routeName === 'Day')) ||
    // Budgets -> Day
    (transitionProps.scene.route.routeName === 'Day' &&
      (prevTransitionProps &&
        prevTransitionProps.scene.route.routeName === 'BudgetsList'))
  ) {
    isCustom = true;
  }
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isCustom,
  );
};

// STACK - Main Application
const HomeStack = createStackNavigator(
  {
    Day: DayScreen,
    Month: MonthScreen,
    Expense: AddExpenseScreen,
    CategoryList: CategoryListScreen,
    CategoryConfig: CategoryConfigScreen,
    BudgetsList: BudgetsListScreen,
    BudgetsConfig: BudgetsConfigScreen,
    BudgetsAmount: BudgetsAmountScreen,
    Settings: SettingsScreen,
    DataManagement: DataManagementScreen,
  },
  {
    initialRouteName: 'Day',
    headerLayoutPreset: 'center',
    defaultNavigationOptions,
    transitionConfig: dynamicModalTransition,
  },
);

// APP CONTAINER
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Initializing: InitializingScreen,
      App: HomeStack,
      Auth: AuthenticationScreen,
    },
    {
      initialRouteName: 'Initializing',
    },
  ),
);

export default function Application() {
  return (
    <FirebaseProvider>
      <DateProvider>
        <AppContainer />
      </DateProvider>
    </FirebaseProvider>
  );
}
