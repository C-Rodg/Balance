import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Components
import BlockButton from '../Shared/BlockButton';
import SecondaryButton from '../Shared/SecondaryButton';

// Props
import COLORS from '../../styles/colors';
import FONTS, { getFontFamilyStyles } from '../../styles/fonts';

function AuthActionSection({
  actionButtonText,
  subActionButtonText,
  onActionButtonPress,
  onSubActionButtonPress,
  bottomRowText,
  bottomRowButtonText,
  onBottomRowButtonPress,
}) {
  return (
    <Fragment>
      <View style={styles.actionSection}>
        <BlockButton
          title={actionButtonText}
          onButtonPress={onActionButtonPress}
        />

        {subActionButtonText && (
          <TouchableOpacity onPress={onSubActionButtonPress}>
            <Text style={styles.forgottenText}>{subActionButtonText}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.bottomSectionRow}>
          <Text style={styles.bottomItemText}>{bottomRowText}</Text>
          <SecondaryButton
            title={bottomRowButtonText}
            onButtonPress={onBottomRowButtonPress}
          />
        </View>
      </View>
    </Fragment>
  );
}

export default AuthActionSection;

const styles = StyleSheet.create({
  actionSection: { marginVertical: 35 },
  forgottenText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.s1,
    color: COLORS.black,
    opacity: 0.7,
    textAlign: 'center',
    paddingVertical: 10,
  },
  bottomSection: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  bottomSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomItemText: {
    ...getFontFamilyStyles('medium'),
    fontSize: FONTS.sizes.p,
    color: COLORS.black,
    marginRight: 15,
  },
});
