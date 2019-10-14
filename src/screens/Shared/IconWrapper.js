// Libraries
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Styling
import COLORS from '../../styles/colors';

function IconWrapper({ iconName, iconLibrary }) {
  return (
    <View style={styles.iconView}>
      <MaterialCommunityIcon
        name={iconName}
        size={36}
        color={COLORS.blueBackground}
      />
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
