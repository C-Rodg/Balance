// Libraries
import React from 'react';
import { Provider } from 'react-redux';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

// Redux store
import { store } from '../redux/store/';

// Screens
import InitializingScreen from '../screens/InitializingScreen';
import StartAuthenticationScreen from '../screens/StartAuthenticationScreen';
import DayScreen from '../screens/DayScreen';
import MonthScreen from '../screens/MonthScreen';
import BudgetsScreen from '../screens/BudgetsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

// STACK - Authentication
const AuthStack = createStackNavigator(
  { StartAuthentication: StartAuthenticationScreen },
  {
    initialRouteName: 'StartAuthentication',
  },
);

// STACK - Main Application
const HomeStack = createStackNavigator(
  {
    Day: DayScreen,
    AddExpense: AddExpenseScreen,
    Month: MonthScreen,
    Budgets: BudgetsScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Day',
  },
);

// APP CONTAINER
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Initializing: InitializingScreen,
      App: HomeStack,
      Auth: AuthStack,
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
