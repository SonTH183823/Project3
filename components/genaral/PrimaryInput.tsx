import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  // Text,
  // View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@constants/Colors';
import { Text, View } from '@components/Themed';

type StyledInputProps = {
    title?: string;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<ViewStyle>;
    styleIcon?: StyleProp<ViewStyle>;
    icon?: string;
    iconColor?: string;
    iconSize?: number;
    alert?: string;
    placeholder?: string;
    onChangeText?: () => void;
};
 
export default function PrimaryInput(props: StyleStyledInputProps,{ navigation}) {
  const {onChangeText, alert, placeholder} = props;
  return (
    <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={placeholder}
            placeholderTextColor={Colors.GREY_TEXT}
            secureTextEntry={false}
            onChangeText={onChangeText}
          />
        </View>
        <View style={styles.alertView}>
          <Text style={styles.alertText}>{alert}</Text>
        </View>
  </View>
  );
}
 
const styles = ScaledSheet.create({
  container: {width: '100%', alignItems: 'center', justifyContent: 'center'},
  inputView: {
    backgroundColor: Colors.INPUT_TEXT,
    borderRadius: '8@s',
    width: "80%",
    height: '45@s',
    // marginBottom: '20@s',
    borderColor: '#ccc',
    borderWidth: 0.8
  },
  

  TextInput: {
    height: '50@s',
    flex: 1,
    padding: '10@s',
    marginHorizontal: '10@s',
    fontSize: 16,
    color: 'black',
  },
  alertView:{
    // backgroundColor: 'red',
    width: '80%',
    paddingHorizontal: '10@s',
    paddingTop: '5@s',
  },
  alertText:{
    color: 'red',
    fontSize: '12@ms0.3'
  }
});