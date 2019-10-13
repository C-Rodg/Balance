// Props
import COLORS from './colors';

export const overlayCardStyles = {
  flex: 1,
  backgroundColor: COLORS.white,
  borderRadius: 20,
  paddingHorizontal: 15,
  paddingVertical: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 1,
};

export const overlayCardWithTopMarginStyles = {
  ...overlayCardStyles,
  marginTop: 25,
};
