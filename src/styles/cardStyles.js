// Props
import COLORS from './colors';
import FONTS, { getFontFamilyStyles } from './fonts';

// Card
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

// Card with consistent top spacing
export const overlayCardWithTopMarginStyles = {
  ...overlayCardStyles,
  marginTop: 25,
};

// Title for card element
export const overlayCardTitleStyles = {
  ...getFontFamilyStyles('medium'),
  fontSize: FONTS.sizes.h6,
};

// Simple message - commonly used for 'not found', etc.
export const simpleMessageStyles = {
  ...getFontFamilyStyles('regular'),
  fontSize: FONTS.sizes.p,
  //paddingHorizontal: 15,
};
