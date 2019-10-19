// Libraries
import React from 'react';
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Redux store
import { store } from '../redux/store/';

// Screens
import InitializingScreen from '../screens/InitializingScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';
import DayScreen from '../screens/DayScreen';
import MonthScreen from '../screens/MonthScreen';
import BudgetsListScreen from '../screens/BudgetsListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import CategoryConfigScreen from '../screens/CategoryConfigScreen';
import BudgetsConfigScreen from '../screens/BudgetsConfigScreen';

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
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Day',
    headerLayoutPreset: 'center',
    defaultNavigationOptions,
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
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
