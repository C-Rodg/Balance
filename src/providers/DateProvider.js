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
const getDaysInMonth = (month, year) => {
  const incrementedMonth = parseInt(month, 10) + 1;
  return new Date(year, incrementedMonth, 0).getDate();
};

// Get Date Key
const getDateKey = (year, month, day) => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
    2,
    '0',
  )}`;
};

// Helper - take in Date object and properly format
const updateStateWithDateStrings = newDate => {
  const currentYear = newDate.getFullYear();
  const currentMonth = newDate.getMonth();
  const currentDay = newDate.getDate();
  const currentDateKey = getDateKey(currentYear, currentMonth + 1, currentDay);

  return {
    currentYear,
    currentMonth,
    currentMonthString: monthMap[currentMonth],
    currentDay,
    currentDateKey,
    daysInMonth: getDaysInMonth(currentMonth, currentYear),
  };
};

class DateProvider extends Component {
  state = {
    ...updateStateWithDateStrings(new Date()),
  };

  // EVENT - Set new current date
  onUpdateCurrentDate = newDate => {
    this.setState({
      ...updateStateWithDateStrings(newDate),
    });
  };

  // EVENT - reset date
  onResetDate = () => {
    this.onUpdateCurrentDate(new Date());
  };

  // EVENT - Incrementing or decrementing the month
  onChangeMonth = isIncrement => {
    const { currentMonth, currentYear, currentDay } = this.state;
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

    let newDay = currentDay;
    const daysInMonth = getDaysInMonth(newMonthNum, newYear);
    if (daysInMonth < currentDay) {
      newDay = daysInMonth;
    }

    const currentDateKey = getDateKey(newYear, newMonthNum + 1, newDay);

    this.setState({
      currentDateKey,
      currentMonth: newMonthNum,
      currentMonthString: monthMap[newMonthNum],
      currentYear: newYear,
      daysInMonth,
      currentDay: newDay,
    });
  };

  // Event - change day only
  onChangeDay = updatedDay => {
    const { currentMonth, currentYear, daysInMonth } = this.state;

    let newYear = currentYear;
    let newMonth = currentMonth;
    let newDay = updatedDay;
    let newDaysInMonth = daysInMonth;

    if (newDay > daysInMonth) {
      // increment to next month
      if (currentMonth === 11) {
        // increment to next year
        newYear += 1;
        newMonth = 0;
      } else {
        newMonth += 1;
      }
      newDay = 1;
      newDaysInMonth = getDaysInMonth(newMonth, newYear);
    } else if (newDay < 1) {
      // decrement to previous month
      if (currentMonth === 0) {
        // decrement to previous year
        newYear -= 1;
        newMonth = 11;
      } else {
        newMonth -= 1;
      }
      newDaysInMonth = getDaysInMonth(newMonth, newYear);
      newDay = newDaysInMonth;
    }

    const currentDateKey = getDateKey(newYear, newMonth + 1, newDay);
    this.setState({
      currentDateKey,
      currentDay: newDay,
      currentYear: newYear,
      currentMonth: newMonth,
      currentMonthString: monthMap[newMonth],
      daysInMonth: newDaysInMonth,
    });
  };

  render() {
    const { children } = this.props;
    const providerObject = {
      ...this.state,
      onUpdateCurrentDate: this.onUpdateCurrentDate,
      onChangeMonth: this.onChangeMonth,
      onChangeDay: this.onChangeDay,
      onResetDate: this.onResetDate,
    };

    return (
      <DateContext.Provider value={providerObject}>
        {children}
      </DateContext.Provider>
    );
  }
}

export default DateProvider;
