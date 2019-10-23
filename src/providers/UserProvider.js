// Libraries
import React, { Component, createContext } from 'react';

// Utils
import { auth, createUserProfileDocument } from '../services/firebase';

// Context
export const UserContext = createContext({ user: null });

// To Use:
// const user = useContext(UserContext)

class UserProvider extends Component {
  state = { user: null };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('onAuthStateChanged', userAuth);
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
