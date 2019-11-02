// Libraries
import Toast from 'react-native-root-toast';

// Props
import COLORS from '../styles/colors';

// Default config
const STANDARD_CONFIG = {
  position: 40,
  duration: 3000,
  opacity: 1,
};

// TODO: explore adding a noise?

// Show error message
export const showErrorMessage = message => {
  showToast(message, { backgroundColor: COLORS.red });
};

// Show success message
export const showSuccessMessage = message => {
  showToast(message, { backgroundColor: COLORS.blueMain });
};

// Show normal message
export const showMessage = message => {
  showToast(message);
};

// Show Toast
const showToast = (message, config = {}) => {
  Toast.show(message, {
    ...STANDARD_CONFIG,
    ...config,
  });
};
