import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '@shared/Colors';

type StyledInputPassProps = {
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
 
export default function PrimaryInputPass(props: StyledInputPassProps,{ navigation}) {
  const {onChangeText, alert, placeholder} = props;
  const [showPass, setShowPass] = React.useState(false);
  return (
    <View style={styles.container}>
        <View style={styles.inputViewPass}>
          <TextInput
            style={styles.TextInput}
            placeholder={placeholder}
            placeholderTextColor={Colors.GREY_TEXT}
            secureTextEntry={!showPass}
            onChangeText={onChangeText}
          />
          <Ionicons
          onPress={() => {
            setShowPass(!showPass);
          }}
          style={{
            marginRight: 10
          }}
          name={showPass ? 'eye-outline' : 'eye-off-outline'}
          size={24}
          color={Colors.GREY_TEXT}
          />
        </View>
        <View style={styles.alertView}>
          <Text style={styles.alertText}>{alert || ''}</Text>
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
  inputViewPass:{
    backgroundColor: Colors.INPUT_TEXT,
    borderRadius: '8@s',
    width: "80%",
    height: '45@s',
    marginTop: '20@s',
    borderColor: '#ccc',
    borderWidth: 0.8,
    flexDirection: 'row',
    alignItems: "center",
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
    fontSize: '12@ms0.3',

  }
});