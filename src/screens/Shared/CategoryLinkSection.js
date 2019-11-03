// Libraries
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import {
  topContentSectionStyles,
  topContentSectionTitleLinkStyles,
  topContentSectionSubTitleStyles,
} from '../../styles/layout';
import COLORS from '../../styles/colors';

const CategoryLinkSection = ({
  navigation,
  navigateWith = {},
  iconName = 'help-circle-outline',
  iconLibrary = 'MaterialCommunityIcons',
  categoryName = '-select a category-',
  submessage,
}) => {
  return (
    <View style={topContentSectionStyles}>
      {getIcon({
        name: iconName,
        library: iconLibrary,
        color: COLORS.white,
        size: 72,
      })}
      <TouchableOpacity
        onPress={() => navigation.navigate('CategoryList', navigateWith)}>
        <Text style={topContentSectionTitleLinkStyles} numberOfLines={1}>
          {categoryName}
        </Text>
      </TouchableOpacity>
      {submessage && (
        <Text style={topContentSectionSubTitleStyles}>{submessage}</Text>
      )}
    </View>
  );
};

export default CategoryLinkSection;
