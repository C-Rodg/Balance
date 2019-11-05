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

// Helpers
const iconKeyExtractor = item => `${item.iconLibrary}-${item.iconName}`;

// Icon list item
class IconListItem extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.selectedName === nextProps.selectedName) {
      return false;
    }
    return true;
  }

  render() {
    const { item, onSelect, selectedName } = this.props;
    const isSelected = selectedName === item.iconName;
    const selectedStyles = isSelected
      ? { backgroundColor: COLORS.blueMain }
      : {};
    return (
      <TouchableHighlight
        underlayColor={!isSelected ? COLORS.gray : COLORS.blueBackground}
        onPress={() => onSelect(item)}
        style={[styles.iconItemStyles, selectedStyles]}>
        {getIcon({
          name: item.iconName,
          size: 36,
          color: !isSelected ? COLORS.black : COLORS.white,
          library: item.iconLibrary,
        })}
      </TouchableHighlight>
    );
  }
}

// List component
class IconSelectionSection extends Component {
  _getIconItem = ({ item }) => {
    return (
      <IconListItem
        item={item}
        selectedName={this.props.selectedName}
        onSelect={this.props.onIconSelect}
      />
    );
  };

  render() {
    return (
      <Fragment>
        <Text style={overlayCardTitleWithPaddingStyles}>Choose an Icon:</Text>
        <FlatList
          style={cardScrollViewStyles}
          data={ICON_LIST}
          renderItem={this._getIconItem}
          numColumns={NumberOfColumns}
          extraData={this.props.selectedName}
          keyExtractor={iconKeyExtractor}
          getItemLayout={(data, index) => ({ length: 50, offset: 0, index })}
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
