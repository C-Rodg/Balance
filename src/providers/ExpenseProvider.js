// Libraries
import React, { Component, createContext } from 'react';

// Utils
import { firestore, getUserUID } from '../services/firebase';

// Context
export const ExpenseContext = createContext({ expenses: {} });

// To Use:
// const expenses = useContext(ExpenseContext)

class ExpenseProvider extends Component {
  state = { expenses: {} };

  unsubscribeFromDB = null;

  componentDidMount = async () => {
    const uid = getUserUID();
    console.log('UUUUUUU----' + uid);
  };

  componentWillUnmount = () => {
    // this.unsubscribeFromDB();
  };

  render() {
    const { expenses } = this.state;
    const { children } = this.props;
    console.log(this.props);

    return (
      <ExpenseContext.Provider value={expenses}>
        {children}
      </ExpenseContext.Provider>
    );
  }
}

export default ExpenseProvider;
