// Props
import COLORS from './colors';
import FONTS, { getFontFamilyStyles } from './fonts';

// Card
export const overlayCardStyles = {
  flex: 1,
  backgroundColor: COLORS.white,
  borderRadius: 20,
  paddingHorizontal: 0,
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

// Title for card element with padding
export const overlayCardTitleWithPaddingStyles = {
  ...overlayCardTitleStyles,
  paddingHorizontal: 15,
};

// Simple message - commonly used for 'not found', etc.
export const simpleMessageStyles = {
  ...getFontFamilyStyles('regular'),
  fontSize: FONTS.sizes.p,
};

// ScrollView for cards
export const cardScrollViewStyles = {
  flex: 1,
  marginVertical: 5,
  paddingHorizontal: 15,
};

// Text input styling
export const textInputStyles = {
  marginTop: 10,
  marginBottom: 35,
};
