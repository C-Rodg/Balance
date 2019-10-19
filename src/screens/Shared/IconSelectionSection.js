// Libraries
import React, { Fragment, Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

// Config
import ICON_LIST from '../../config/iconList';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styles
import {
  overlayCardTitleWithPaddingStyles,
  cardScrollViewStyles,
} from '../../styles/cardStyles';

// Props
import COLORS from '../../styles/colors';

// Calculate the number of columns to render
const NumberOfColumns = Math.floor(Dimensions.get('screen').width / 60);

class IconSelectionSection extends Component {
  // Render the list of icons
  _renderIconListItems = ({ item }) => {
    const isSelected = item.iconName === this.props.selectedName;
    const selectedStyles = isSelected
      ? { backgroundColor: COLORS.blueMain }
      : {};

    return (
      <TouchableHighlight
        underlayColor={!isSelected ? COLORS.gray : COLORS.blueBackground}
        onPress={() => this.props.onIconSelect(item)}
        style={[styles.iconItemStyles, selectedStyles]}>
        {getIcon({
          name: item.iconName,
          size: 36,
          color: !isSelected ? COLORS.black : COLORS.white,
          library: item.iconLibrary,
        })}
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <Fragment>
        <Text style={overlayCardTitleWithPaddingStyles}>Choose an Icon:</Text>
        <FlatList
          style={cardScrollViewStyles}
          data={ICON_LIST}
          renderItem={this._renderIconListItems}
          numColumns={NumberOfColumns}
          extraData={this.props.selectedName}
          keyExtractor={item => {
            return `${item.iconLibrary}-${item.iconName}`;
          }}
        />
      </Fragment>
    );
  }
}

export default IconSelectionSection;

const styles = StyleSheet.create({
  iconItemStyles: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});
