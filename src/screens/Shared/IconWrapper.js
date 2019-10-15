// Libraries
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';

function IconWrapper({ iconName, iconLibrary }) {
  return (
    <View style={styles.iconView}>
      {getIcon({
        name: iconName,
        size: 36,
        library: iconLibrary,
        color: COLORS.blueBackground,
      })}
    </View>
  );
}

export default IconWrapper;

const styles = StyleSheet.create({
  iconView: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
});
