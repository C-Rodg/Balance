// Libraries
import React from 'react';

// Utils
import { getHOCDisplayName } from './hocHelpers';

// Provider
import { DateContext } from '../providers/DateProvider';

const withDate = Component => {
  const WrappedComponent = props => {
    return (
      <DateContext.Consumer>
        {value => <Component {...value} {...props} />}
      </DateContext.Consumer>
    );
  };
  WrappedComponent.displayName = `WithDate(${getHOCDisplayName(
    WrappedComponent,
  )})`;
  return WrappedComponent;
};

export default withDate;
