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

// Data Row Sections - wrapper
export const dataRowSectionStyles = {
  marginBottom: 40,
};

// Data Row Sections - title
export const dataRowSectionTitleStyles = {
  ...getFontFamilyStyles('medium'),
  textTransform: 'uppercase',
  paddingHorizontal: 15,
  letterSpacing: 0.8,
  fontSize: FONTS.sizes.s1,
  color: COLORS.black,
  marginBottom: 5,
};

// Data Row Section - Action Row
export const dataRowSectionActionRowStyles = {
  backgroundColor: COLORS.white,
  paddingHorizontal: 15,
  paddingVertical: 11,
  borderTopColor: COLORS.gray,
  borderTopWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
};

// Data Row Section - Last Action Row
export const dataRowSectionLastActionRowStyles = {
  ...dataRowSectionActionRowStyles,
  borderBottomColor: COLORS.gray,
  borderBottomWidth: 1,
};

// Data Row Section - Text
export const dataRowActionRowTextStyles = {
  ...getFontFamilyStyles('regular'),
  fontSize: FONTS.sizes.p,
  color: COLORS.black,
  marginRight: 10,
};

// Data Row Section - SubText
export const dataRowActionRowSubTextStyles = {
  ...getFontFamilyStyles('regular'),
  fontSize: FONTS.sizes.p,
  color: COLORS.black,
  opacity: 0.6,
  flexShrink: 1,
};
