// Props
import FONTS, { getFontFamilyStyles } from './fonts';
import COLORS from './colors';

// Wrapper - blue background
export const blueWrapperStyles = {
  flex: 1,
  backgroundColor: COLORS.blueMain,
};

// Wrapper - off white background
export const offWhiteWrapperStyles = {
  flex: 1,
  backgroundColor: COLORS.offWhite,
};

// Top section - typically used for info above card
export const topContentSectionStyles = {
  paddingHorizontal: 15,
  paddingVertical: 20,
};

// Top section - title
export const topContentSectionTitleStyles = {
  color: COLORS.white,
  ...getFontFamilyStyles('medium'),
  fontSize: FONTS.sizes.h3,
};

// Top section - clickable title
export const topContentSectionTitleLinkStyles = {
  ...topContentSectionTitleStyles,
  textDecorationLine: 'underline',
};

// Top section - subtitle
export const topContentSectionSubTitleStyles = {
  color: COLORS.white,
  ...getFontFamilyStyles('regular'),
  fontSize: FONTS.sizes.h6,
};
