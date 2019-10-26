// Libraries
import React from 'react';

// Utils
import { getHOCDisplayName } from './hocHelpers';

// Provider
import { FirebaseContext } from '../providers/FirebaseProvider';

const withFirebase = Component => {
  const WrappedComponent = props => {
    return (
      <FirebaseContext.Consumer>
        {value => (
          <Component
            firebase={value.firebase}
            user={value.user}
            expenses={value.expenses}
            categories={value.categories}
            budgets={value.budgets}
            {...props}
          />
        )}
      </FirebaseContext.Consumer>
    );
  };
  WrappedComponent.displayName = `WithFirebase(${getHOCDisplayName(
    WrappedComponent,
  )})`;
  return WrappedComponent;
};

// NOTE: HOCs seem to break navigation headers with react-navigation

export default withFirebase;
