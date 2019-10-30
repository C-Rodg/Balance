// Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Utils
import { getIcon } from '../../utils/iconNormalizer';

// Styling
import COLORS from '../../styles/colors';

class SwipeableRow extends Component {
  // Render the individual action button
  _renderRightAction = (type, icon, color, x, progress, dragX) => {
    const { onDelete, onEdit, rowId } = this.props;
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      if (type === 'EDIT') {
        onEdit(rowId);
      } else {
        onDelete(rowId);
      }
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          {getIcon({
            name: icon,
            size: 32,
            color: COLORS.white,
          })}
        </RectButton>
      </Animated.View>
    );
  };

  // Render the actions on the right
  _renderRightActions = (progress, dragX) => {
    const { hideEdit, hideDelete } = this.props;
    if (hideEdit && hideDelete) {
      return null;
    }
    return (
      <View style={{ width: 128, flexDirection: 'row' }}>
        {!hideEdit &&
          this._renderRightAction(
            'EDIT',
            'pencil',
            '#feca57',
            128,
            progress,
            dragX,
          )}
        {!hideDelete &&
          this._renderRightAction(
            'DELETE',
            'delete-forever',
            '#ee5253',
            64,
            progress,
            dragX,
          )}
      </View>
    );
  };

  // Update the Ref
  updateRef = ref => {
    this._swipeableRow = ref;
  };

  // Close the swipeable row
  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const providedStyles = this.props.styles || {};
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this._renderRightActions}>
        <RectButton style={[styles.rectButton, providedStyles]}>
          {this.props.children}
        </RectButton>
      </Swipeable>
    );
  }
}

export default SwipeableRow;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rectButton: {
    flex: 1,
    height: 60,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
