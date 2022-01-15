import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';

type StyledButtonProps = {
    title?: string;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<ViewStyle>;
    styleIcon?: StyleProp<ViewStyle>;
    icon?: string;
    iconColor?: string;
    iconSize?: number;
    onPress?: () => void;
};
  

export default PrimaryButton = (props: StyledButtonProps) =>{
    const { style, icon, title, onPress, titleStyle, iconSize, iconColor } = props;
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        style={[styles.container, style, disabled && { backgroundColor: Colors.GRAY }]}>
        {icon ? (
          typeof icon === 'string' ? (
            <Ionicons name={icon} size={iconSize || 24} color={iconColor || Colors.WHITE} />
          ) : null
        ) : null}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: '50@s',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '30@s',
      backgroundColor: Colors.COLOR_BUTTON
    },
    title: {
      color: Colors.WHITE,
      fontWeight: '500',
      fontSize: '18@ms0.3',
      marginLeft: 5
    }
  });