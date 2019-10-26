// Libraries
import React from 'react';

// Provider
import { FirebaseContext } from '../providers/FirebaseProvider';

// Helper - shows wrapped component name
const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

// NOTE: HOCs seem to break navigation headers
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
  WrappedComponent.displayName = `WithFirebase(${getDisplayName(
    WrappedComponent,
  )})`;
  return WrappedComponent;
};

export default withFirebase;
