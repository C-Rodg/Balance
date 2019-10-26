// Libraries
import React, { Component, createContext } from 'react';

// Context
export const DateContext = createContext(null);

// To Use:
// const dates = useContext(DateContext)

// Helper - mapping of months
const monthMap = {
  '0': 'January',
  '1': 'February',
  '2': 'March',
  '3': 'April',
  '4': 'May',
  '5': 'June',
  '6': 'July',
  '7': 'August',
  '8': 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December',
};

// Helper - take in month (0 indexed) and a year and return days in month
const daysInMonth = (month, year) => {
  const incrementedMonth = parseInt(month, 10) + 1;
  return new Date(year, incrementedMonth, 0).getDate();
};

// Helper - take in Date object and properly format
const updateStateWithDateStrings = newDate => {
  const currentYear = newDate.getFullYear();
  const currentMonth = newDate.getMonth();
  const currentDay = newDate.getDate();
  const currentDateKey = `${currentYear}-${String(currentMonth + 1).padStart(
    2,
    '0',
  )}-${String(newDate.getDate()).padStart(2, '0')}`;

  return {
    currentYear,
    currentMonth,
    currentMonthString: monthMap[currentMonth],
    currentDay,
    currentDateKey,
    daysInMonth: daysInMonth(currentMonth, currentYear),
  };
};

class DateProvider extends Component {
  state = {
    ...updateStateWithDateStrings(new Date()),
  };

  // Set new current date
  onUpdateCurrentDate = newDate => {
    this.setState({
      ...updateStateWithDateStrings(newDate),
    });
  };

  // Incrementing or decrementing the month
  onChangeMonth = isIncrement => {
    const { currentMonth, currentYear } = this.state;
    let newMonthNum = currentMonth;
    let newYear = currentYear;

    if (isIncrement && currentMonth <= 10) {
      newMonthNum += 1;
    } else if (!isIncrement && currentMonth >= 1) {
      newMonthNum -= 1;
    } else if (isIncrement) {
      // raising and at year edge
      newMonthNum = 0;
      newYear += 1;
    } else {
      // lowering and at year edge
      newMonthNum = 11;
      newYear -= 1;
    }

    this.setState({
      currentMonth: newMonthNum,
      currentMonthString: monthMap[newMonthNum],
      currentYear: newYear,
      daysInMonth: daysInMonth(newMonthNum, newYear),
    });
  };

  render() {
    const { children } = this.props;
    const providerObject = {
      ...this.state,
      onUpdateCurrentDate: this.onUpdateCurrentDate,
      onChangeMonth: this.onChangeMonth,
    };

    return (
      <DateContext.Provider value={providerObject}>
        {children}
      </DateContext.Provider>
    );
  }
}

export default DateProvider;
