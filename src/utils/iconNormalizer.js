// Libraries
import React from 'react';

// Icon libraries
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// Mapping
const iconMap = {
  materialcommunityicon: MaterialCommunityIcon,
  ionicons: Ionicons,
  feather: Feather,
};

// Get the icon from the particular library
export const getIcon = ({
  name,
  library = 'MaterialCommunityIcon',
  size = 18,
  color = '#111',
  ...rest
}) => {
  const TheIcon = iconMap[library.toLowerCase()];
  console.log(TheIcon);
  return <TheIcon size={size} name={name} color={color} {...rest} />;
};
