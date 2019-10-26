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
        {value => (
          <Component
            onUpdateCurrentDate={value.onUpdateCurrentDate}
            onChangeMonth={value.onChangeMonth}
            currentYear={value.currentYear}
            currentMonth={value.currentMonth}
            currentMonthString={value.currentMonthString}
            currentDay={value.currentDay}
            currentDateKey={value.currentDateKey}
            {...props}
          />
        )}
      </DateContext.Consumer>
    );
  };
  WrappedComponent.displayName = `WithDate(${getHOCDisplayName(
    WrappedComponent,
  )})`;
  return WrappedComponent;
};

export default withDate;
