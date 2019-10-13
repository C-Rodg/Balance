// Props
import FONTS, { getFontFamilyStyles } from './fonts';
import COLORS from './colors';

// Top section - typically used for info above card
export const topContentSectionStyles = {
  paddingTop: 20,
  paddingHorizontal: 15,
  paddingBottom: 15,
};

// Top section - title
export const topContentSectionTitleStyles = {
  color: COLORS.white,
  ...getFontFamilyStyles('medium'),
  fontSize: FONTS.sizes.h3,
};

// Top section - subtitle
export const topContentSectionSubTitleStyles = {
  color: COLORS.white,
  ...getFontFamilyStyles('regular'),
  fontSize: FONTS.sizes.h6,
};
