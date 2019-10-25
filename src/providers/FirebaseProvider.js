// Libraries
import React, { Component, createContext } from 'react';

// Utils
import Firebase from '../services/firebase';

// Context
export const FirebaseContext = createContext(null);

// To Use:
// const firebase = useContext(FirebaseContext)

class FirebaseProvider extends Component {
  state = {
    user: null,
    expenses: {},
    firebase: new Firebase(),
  };

  // Subscriptions
  unsubscribeFromAuth = null;
  unsubscribeFromExpenses = null;

  componentDidMount = async () => {
    console.log('FIREBASE PROVIDER MOUNTED!');
    const { firebase } = this.state;
    // Setup auth listener
    this.unsubscribeFromAuth = firebase.auth.onAuthStateChanged(
      async userAuth => {
        const user = await firebase.createUserProfileDocument(userAuth);
        console.log('GOT USER - ', user);

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
  };

  // Handle setup of listeners that depend on authentication
  handleDatabaseListenerSetup = () => {
    const { firebase } = this.state;
    this.unsubscribeFromExpenses = firebase
      .getExpensesCollectionRef()
      .onSnapshot(snapshot => {
        console.log('EXPENSES CHANGED');
        console.log(snapshot.docs); // TODO: why is this called twice?
      });
  };

  // Handle teardown of listeners that depend on authentication
  handleDatabaseListenerTeardown = () => {
    this.unsubscribeFromExpenses && this.unsubscribeFromExpenses();
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
