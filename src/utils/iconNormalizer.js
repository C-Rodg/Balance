// Libraries
import React from 'react';

// Icon libraries
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// Mapping
const iconMap = {
  materialcommunityicons: MaterialCommunityIcons,
  ionicons: Ionicons,
  feather: Feather,
};

// Get the icon from the particular library
export const getIcon = ({
  name,
  library = 'MaterialCommunityIcons',
  size = 18,
  color = '#111',
  ...rest
}) => {
  const TheIcon = iconMap[library.toLowerCase()];
  return <TheIcon size={size} name={name} color={color} {...rest} />;
};
