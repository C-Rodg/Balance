// Libraries
import React, { Component, createContext } from 'react';

// Services
import Firebase from '../services/firebase';

// Utils
import {
  collectIdsAndDocs,
  convertCollectionToKeyedObject,
} from '../utils/databaseHelpers';

// Defaults
import { defaultCategories } from '../config/defaultCategories';

// Context
export const FirebaseContext = createContext(null);

// To Use:
// const firebase = useContext(FirebaseContext)

class FirebaseProvider extends Component {
  state = {
    user: null,
    expenses: {},
    budgets: {},
    categories: {
      ...defaultCategories,
    },
    firebase: new Firebase(),
  };

  // Subscriptions
  unsubscribeFromAuth = null;
  unsubscribeFromExpenses = null;
  unsubscribeFromCategories = null;
  unsubscribeFromBudgets = null;

  componentDidMount = async () => {
    const { firebase } = this.state;
    // Setup auth listener
    this.unsubscribeFromAuth = firebase.auth.onAuthStateChanged(
      async userAuth => {
        const user = await firebase.createUserProfileDocument(userAuth);
        console.log('USER:');
        console.log(user);

        if (user) {
          // handle setup of expense and budget listeners
          this.handleDatabaseListenerSetup();
        } else {
          // tear down expense and budget listeners
          this.handleDatabaseListenerTeardown();
        }

        this.setState({ user });
      },
    );
  };

  componentWillUnmount = () => {
    // Unsubscribe from everything
    this.unsubscribeFromAuth && this.unsubscribeFromAuth();
    this.unsubscribeFromExpenses && this.unsubscribeFromExpenses();
    this.unsubscribeFromBudgets && this.unsubscribeFromBudgets();
    this.unsubscribeFromCategories && this.unsubscribeFromCategories();
  };

  // Handle setup of listeners that depend on authentication
  handleDatabaseListenerSetup = () => {
    const { firebase } = this.state;

    // Expenses
    this.unsubscribeFromExpenses = firebase
      .getExpensesCollectionRef()
      .onSnapshot(snapshot => {
        const expenses = snapshot.docs.map(collectIdsAndDocs);
        console.log('EXPENSES:');
        console.log(expenses);
        this.setState({
          expenses,
        });
      });

    // Budgets
    this.unsubscribeFromBudgets = firebase
      .getBudgetsCollectionRef()
      .onSnapshot(snapshot => {
        const budgets = snapshot.docs.map(collectIdsAndDocs);
        console.log('BUDGETS:');
        console.log(budgets);
        this.setState({
          budgets,
        });
      });

    // Categories
    this.unsubscribeFromCategories = firebase
      .getCategoriesCollectionRef()
      .onSnapshot(snapshot => {
        const categories = convertCollectionToKeyedObject(snapshot.docs);
        console.log('CATEGORIES');
        console.log(categories);
        this.setState({
          categories,
        });
      });
  };

  // Handle teardown of listeners that depend on authentication
  handleDatabaseListenerTeardown = () => {
    this.unsubscribeFromExpenses && this.unsubscribeFromExpenses();
    this.unsubscribeFromBudgets && this.unsubscribeFromBudgets();
    this.unsubscribeFromCategories && this.unsubscribeFromCategories();
  };

  render() {
    const { children } = this.props;

    return (
      <FirebaseContext.Provider value={this.state}>
        {children}
      </FirebaseContext.Provider>
    );
  }
}

export default FirebaseProvider;
